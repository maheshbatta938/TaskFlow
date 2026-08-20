import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { AuthResponse, LoginRequest, SignupRequest, User } from '../models/user.model';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  // Exposes the logged-in user as an observable so the sidebar and route
  // guards react immediately to login/logout without polling storage.
  private readonly currentUserSubject = new BehaviorSubject<User | null>(this.tokenStorage.getUser());
  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  signup(payload: SignupRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.apiUrl}/signup`, payload)
      .pipe(tap((res) => this.handleAuthSuccess(res.data)));
  }

  login(payload: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, payload)
      .pipe(tap((res) => this.handleAuthSuccess(res.data)));
  }

  logout(): Observable<ApiResponse<null>> {
    return this.http
      .post<ApiResponse<null>>(`${this.apiUrl}/logout`, {})
      .pipe(tap(() => this.clearSession()));
  }

  clearSession(): void {
    this.tokenStorage.clear();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.tokenStorage.getToken();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private handleAuthSuccess(data: AuthResponse): void {
    this.tokenStorage.setToken(data.token);
    this.tokenStorage.setUser(data.user);
    this.currentUserSubject.next(data.user);
  }
}
