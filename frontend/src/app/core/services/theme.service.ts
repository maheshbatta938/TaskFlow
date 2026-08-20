import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const THEME_KEY = 'tms_theme';
export type Theme = 'light' | 'dark';

// Applies the theme as a data-theme attribute on <html> so styles.scss can
// switch CSS custom properties globally without every component knowing
// about dark mode. Exposed as an observable so the sidebar's toggle icon
// stays in sync without polling.
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeSubject = new BehaviorSubject<Theme>((localStorage.getItem(THEME_KEY) as Theme) || 'light');
  readonly theme$ = this.themeSubject.asObservable();

  init(): void {
    this.apply(this.themeSubject.value);
  }

  getTheme(): Theme {
    return this.themeSubject.value;
  }

  toggle(): void {
    this.apply(this.themeSubject.value === 'light' ? 'dark' : 'light');
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    this.themeSubject.next(theme);
  }
}
