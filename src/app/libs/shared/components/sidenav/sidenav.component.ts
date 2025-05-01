import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  HEADER_OPTION,
  HEADER_OPTIONS,
  HEADER_SETTINGS_OPTION,
  HEADER_SETTINGS_OPTIONS,
} from '../../constants/constants';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  sidenavOpen = false;
  headerOptions: HEADER_OPTION[] = HEADER_OPTIONS;
  headerSettingsOptions: HEADER_SETTINGS_OPTION[] = HEADER_SETTINGS_OPTIONS;
  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }
  handleHeaderOptionClick(option: HEADER_OPTION) {}
  handleSettingsOptionClick(option: HEADER_SETTINGS_OPTION) {}
}
