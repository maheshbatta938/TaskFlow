import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, Toast } from '../../services/notification.service';

const AUTO_DISMISS_MS = 4000;

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription?: Subscription;

  constructor(private notification: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notification.toasts$.subscribe((toast) => {
      this.toasts.push(toast);
      setTimeout(() => this.dismiss(toast.id), AUTO_DISMISS_MS);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  dismiss(id: number): void {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }
}
