import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type ToastType = 'success' | 'error';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

// Single source of user-facing success/error messages. Any service or
// component can call success()/error() instead of each screen building its
// own alert UI, and ToastComponent is the one place that renders them.
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 1;
  private readonly toastSubject = new Subject<Toast>();
  readonly toasts$ = this.toastSubject.asObservable();

  success(message: string): void {
    this.emit('success', message);
  }

  error(message: string): void {
    this.emit('error', message);
  }

  private emit(type: ToastType, message: string): void {
    this.toastSubject.next({ id: this.nextId++, type, message });
  }
}
