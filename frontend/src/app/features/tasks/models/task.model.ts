import { TaskPriority, TaskStatus } from '../../../core/constants/task.constants';
import { PaginationMeta } from '../../../core/models/api-response.model';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
}

export type UpdateTaskRequest = Partial<CreateTaskRequest>;

export interface TaskListResponse {
  tasks: Task[];
  pagination: PaginationMeta;
}

export interface TaskQueryParams {
  status?: TaskStatus | '';
  priority?: TaskPriority | '';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'dueDate' | 'priority' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface TaskAnalytics {
  total: number;
  completed: number;
  pending: number;
  completionPercentage: number;
  byStatus: Record<TaskStatus, number>;
  byPriority: Record<TaskPriority, number>;
  overdue: number;
}
