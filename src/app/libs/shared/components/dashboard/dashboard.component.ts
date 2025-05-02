import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
