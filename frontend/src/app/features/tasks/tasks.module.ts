import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskTableComponent } from './components/task-table/task-table.component';
import { TaskFilterComponent } from './components/task-filter/task-filter.component';


@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    TaskCardComponent,
    TaskTableComponent,
    TaskFilterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
