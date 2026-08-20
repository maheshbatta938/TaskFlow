import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { Task, TaskQueryParams } from '../../models/task.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TaskFilterValue } from '../../components/task-filter/task-filter.component';
import { TaskSortField } from '../../components/task-table/task-table.component';
import { TaskStatus } from '../../../../core/constants/task.constants';

const DEFAULT_LIMIT = 10;

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  error = false;

  page = 1;
  limit = DEFAULT_LIMIT;
  total = 0;
  totalPages = 1;

  sortBy: TaskSortField = 'createdAt';
  sortOrder: 'asc' | 'desc' = 'desc';

  private filters: TaskFilterValue = { status: '', priority: '', search: '' };
  taskPendingDelete: Task | null = null;

  constructor(private taskService: TaskService, private notification: NotificationService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.error = false;

    const query: TaskQueryParams = {
      ...this.filters,
      page: this.page,
      limit: this.limit,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
    };

    this.taskService
      .getTasks(query)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          this.tasks = res.tasks;
          this.total = res.pagination.total;
          this.totalPages = res.pagination.totalPages;
        },
        error: () => (this.error = true),
      });
  }

  onFilterChange(value: TaskFilterValue): void {
    this.filters = value;
    this.page = 1;
    this.loadTasks();
  }

  onSortChange(field: TaskSortField): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.loadTasks();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.loadTasks();
  }

  onStatusChange(event: { task: Task; status: TaskStatus }): void {
    this.taskService.updateStatus(event.task.id, event.status).subscribe({
      next: (updated) => {
        this.tasks = this.tasks.map((t) => (t.id === updated.id ? updated : t));
        this.notification.success('Task status updated');
      },
    });
  }

  confirmDelete(task: Task): void {
    this.taskPendingDelete = task;
  }

  cancelDelete(): void {
    this.taskPendingDelete = null;
  }

  deleteConfirmed(): void {
    if (!this.taskPendingDelete) return;
    const task = this.taskPendingDelete;

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.notification.success('Task deleted successfully');
        this.taskPendingDelete = null;
        this.loadTasks();
      },
      error: () => (this.taskPendingDelete = null),
    });
  }
}
