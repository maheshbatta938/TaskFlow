import { Component, Input } from '@angular/core';
import { TASK_STATUS_LABELS, TaskStatus } from '../../../core/constants/task.constants';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent {
  @Input() status!: TaskStatus;

  get label(): string {
    return TASK_STATUS_LABELS[this.status];
  }
}
