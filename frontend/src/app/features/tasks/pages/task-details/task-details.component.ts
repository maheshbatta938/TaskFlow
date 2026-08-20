import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TaskStatus } from '../../../../core/constants/task.constants';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  task: Task | null = null;
  loading = true;
  error = false;
  confirmingDelete = false;
  taskStatus = TaskStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.error = false;

    this.taskService
      .getTaskById(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (task) => (this.task = task),
        error: () => (this.error = true),
      });
  }

  markComplete(): void {
    if (!this.task) return;
    this.taskService.updateStatus(this.task.id, TaskStatus.DONE).subscribe({
      next: (updated) => {
        this.task = updated;
        this.notification.success('Task marked as completed');
      },
    });
  }

  deleteConfirmed(): void {
    if (!this.task) return;
    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => {
        this.notification.success('Task deleted successfully');
        this.router.navigate(['/tasks']);
      },
    });
  }
}
