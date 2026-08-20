import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response.model';
import { TaskStatus } from '../../../core/constants/task.constants';
import {
  CreateTaskRequest,
  Task,
  TaskAnalytics,
  TaskListResponse,
  TaskQueryParams,
  UpdateTaskRequest,
} from '../models/task.model';

// All task HTTP calls live here so components never call HttpClient
// directly; components stay focused on presentation.
@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(query: TaskQueryParams): Observable<TaskListResponse> {
    let params = new HttpParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http
      .get<ApiResponse<TaskListResponse>>(this.apiUrl, { params })
      .pipe(map((res) => res.data));
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<ApiResponse<Task>>(`${this.apiUrl}/${id}`).pipe(map((res) => res.data));
  }

  createTask(payload: CreateTaskRequest): Observable<Task> {
    return this.http.post<ApiResponse<Task>>(this.apiUrl, payload).pipe(map((res) => res.data));
  }

  updateTask(id: number, payload: UpdateTaskRequest): Observable<Task> {
    return this.http.put<ApiResponse<Task>>(`${this.apiUrl}/${id}`, payload).pipe(map((res) => res.data));
  }

  updateStatus(id: number, status: TaskStatus): Observable<Task> {
    return this.http
      .patch<ApiResponse<Task>>(`${this.apiUrl}/${id}/status`, { status })
      .pipe(map((res) => res.data));
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`).pipe(map(() => undefined));
  }

  getAnalytics(): Observable<TaskAnalytics> {
    return this.http
      .get<ApiResponse<TaskAnalytics>>(`${this.apiUrl}/analytics`)
      .pipe(map((res) => res.data));
  }
}
