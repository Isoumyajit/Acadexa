import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  toggleTheme(theme: string) {
    document.body.classList.remove('dark_mode', 'light_mode');
    document.body.classList.add(theme);
  }
}
