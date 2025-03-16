import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import {
  MatSlideToggle,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-header',
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private store: Store, private themeService: ThemeService) {}
  handleThemeChange(event: MatSlideToggle) {
    if (event.checked) {
      this.themeService.toggleTheme('dark');
    } else {
      this.themeService.toggleTheme('light');
    }
  }
  logout() {}
}
