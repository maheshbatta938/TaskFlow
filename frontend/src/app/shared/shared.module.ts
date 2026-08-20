import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ErrorStateComponent } from './components/error-state/error-state.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { PriorityBadgeComponent } from './components/priority-badge/priority-badge.component';
import { ToastComponent } from './components/toast/toast.component';
import { IconComponent } from './components/icon/icon.component';



@NgModule({
  declarations: [
    LoadingComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    ConfirmDialogComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    ToastComponent,
    IconComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    ConfirmDialogComponent,
    StatusBadgeComponent,
    PriorityBadgeComponent,
    ToastComponent,
    IconComponent
  ]
})
export class SharedModule { }
