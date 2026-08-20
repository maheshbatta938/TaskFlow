import { Component, Input } from '@angular/core';
import { TASK_PRIORITY_LABELS, TaskPriority } from '../../../core/constants/task.constants';

@Component({
  selector: 'app-priority-badge',
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.scss'],
})
export class PriorityBadgeComponent {
  @Input() priority!: TaskPriority;

  get label(): string {
    return TASK_PRIORITY_LABELS[this.priority];
  }
}
