import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS, TaskPriority, TaskStatus } from '../../../../core/constants/task.constants';

export interface TaskFilterValue {
  status: TaskStatus | '';
  priority: TaskPriority | '';
  search: string;
}

const SEARCH_DEBOUNCE_MS = 350;

// Emits filter changes so the parent (TaskListComponent) can trigger a
// backend query; filtering itself is never done client-side.
@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
})
export class TaskFilterComponent implements OnInit, OnDestroy {
  @Output() filterChange = new EventEmitter<TaskFilterValue>();

  statusOptions = TASK_STATUS_OPTIONS;
  priorityOptions = TASK_PRIORITY_OPTIONS;

  form = this.fb.group({
    status: [''],
    priority: [''],
    search: [''],
  });

  private subscription?: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subscription = this.form.valueChanges
      .pipe(debounceTime(SEARCH_DEBOUNCE_MS), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe((value) => this.filterChange.emit(value as TaskFilterValue));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  reset(): void {
    this.form.reset({ status: '', priority: '', search: '' });
  }
}
