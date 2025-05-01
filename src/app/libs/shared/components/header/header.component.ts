import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../services/theme/theme.service';
import { APP_NAME, APP_THEME } from '../../constants/constants';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly appName = APP_NAME;
  readonly theme = APP_THEME;
  constructor(private store: Store, private themeService: ThemeService) {}
  handleThemeChange(event: string) {
    this.themeService.toggleTheme(event);
  }
  logout() {}
}
