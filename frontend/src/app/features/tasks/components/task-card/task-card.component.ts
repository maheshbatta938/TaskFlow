import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TASK_STATUS_OPTIONS, TaskStatus } from '../../../../core/constants/task.constants';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  statusOptions = TASK_STATUS_OPTIONS;
  @Output() delete = new EventEmitter<Task>();
  @Output() statusChange = new EventEmitter<{ task: Task; status: TaskStatus }>();

  isOverdue(): boolean {
    if (!this.task.dueDate || this.task.status === TaskStatus.DONE) return false;
    return new Date(this.task.dueDate) < new Date(new Date().toDateString());
  }

  onStatusChange(status: string): void {
    this.statusChange.emit({ task: this.task, status: status as TaskStatus });
  }
}
