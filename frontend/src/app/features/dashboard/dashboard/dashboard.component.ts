import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { TaskService } from '../../tasks/services/task.service';
import { TaskAnalytics } from '../../tasks/models/task.model';
import { TASK_PRIORITY_LABELS, TASK_STATUS_LABELS, TaskPriority, TaskStatus } from '../../../core/constants/task.constants';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  analytics: TaskAnalytics | null = null;
  loading = true;
  error = false;

  statusLabels = TASK_STATUS_LABELS;
  priorityLabels = TASK_PRIORITY_LABELS;
  statusKeys = Object.values(TaskStatus);
  priorityKeys = Object.values(TaskPriority);

  constructor(private taskService: TaskService, private authService: AuthService) {}

  get userName(): string {
    return this.authService.getCurrentUser()?.name ?? '';
  }

  ngOnInit(): void {
    this.loadAnalytics();
  }

  loadAnalytics(): void {
    this.loading = true;
    this.error = false;

    this.taskService
      .getAnalytics()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => (this.analytics = data),
        error: () => (this.error = true),
      });
  }

  statusCount(status: TaskStatus): number {
    return this.analytics?.byStatus[status] ?? 0;
  }

  priorityCount(priority: TaskPriority): number {
    return this.analytics?.byPriority[priority] ?? 0;
  }
}
