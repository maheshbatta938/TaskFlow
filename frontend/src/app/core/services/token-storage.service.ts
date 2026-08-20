import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const TOKEN_KEY = 'tms_token';
const USER_KEY = 'tms_user';

// Centralizes sessionStorage access behind one service so no other part of the
// app touches the browser storage API or its key names directly. Using
// sessionStorage (instead of localStorage) means the token is cleared as
// soon as the tab is closed, so the user has to log in again next time.
@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  getUser(): User | null {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  setUser(user: User): void {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  clear(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }
}
