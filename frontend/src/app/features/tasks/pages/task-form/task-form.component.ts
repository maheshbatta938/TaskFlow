import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS, TaskPriority, TaskStatus } from '../../../../core/constants/task.constants';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  statusOptions = TASK_STATUS_OPTIONS;
  priorityOptions = TASK_PRIORITY_OPTIONS;

  taskId: number | null = null;
  loading = false;
  submitting = false;

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: [''],
    status: [TaskStatus.TODO, [Validators.required]],
    priority: [TaskPriority.MEDIUM, [Validators.required]],
    dueDate: [''],
  });

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get f() {
    return this.form.controls;
  }

  get isEditMode(): boolean {
    return this.taskId !== null;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taskId = Number(idParam);
      this.loadTask(this.taskId);
    }
  }

  private loadTask(id: number): void {
    this.loading = true;
    this.taskService
      .getTaskById(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (task) => {
          this.form.patchValue({
            title: task.title,
            description: task.description ?? '',
            status: task.status,
            priority: task.priority,
            dueDate: task.dueDate ?? '',
          });
        },
        error: () => this.router.navigate(['/tasks']),
      });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload = {
      title: raw.title!,
      description: raw.description || null,
      status: raw.status as TaskStatus,
      priority: raw.priority as TaskPriority,
      dueDate: raw.dueDate || null,
    };

    this.submitting = true;
    const request$ = this.isEditMode
      ? this.taskService.updateTask(this.taskId!, payload)
      : this.taskService.createTask(payload);

    request$.pipe(finalize(() => (this.submitting = false))).subscribe({
      next: (task) => {
        this.notification.success(this.isEditMode ? 'Task updated successfully' : 'Task created successfully');
        this.router.navigate(['/tasks', task.id]);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }
}
