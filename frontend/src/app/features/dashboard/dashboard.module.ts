import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsCardComponent } from './components/analytics-card/analytics-card.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DashboardComponent, AnalyticsCardComponent],
  imports: [CommonModule, RouterModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
