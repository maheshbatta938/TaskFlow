import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../../../core/constants/task.constants';

export type TaskSortField = 'title' | 'dueDate' | 'priority' | 'createdAt';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent {
  @Input() tasks: Task[] = [];
  @Input() sortBy: TaskSortField = 'createdAt';
  @Input() sortOrder: 'asc' | 'desc' = 'desc';

  @Output() delete = new EventEmitter<Task>();
  @Output() sortChange = new EventEmitter<TaskSortField>();

  onSort(field: TaskSortField): void {
    this.sortChange.emit(field);
  }

  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === TaskStatus.DONE) return false;
    return new Date(task.dueDate) < new Date(new Date().toDateString());
  }
}
