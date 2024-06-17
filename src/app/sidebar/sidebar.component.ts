import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule, 
    MatExpansionModule, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatListModule, 
    CommonModule, 
    ButtonModule
  ],
  providers: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router){}

  redirectToDashboard(): void {
    this.router.navigate(['layout/dashboard'])
  }
  redirectToWarehouses(): void {
    this.router.navigate(['layout/warehouses'])
  }
  redirectToCustomers(): void {
    this.router.navigate(['layout/customers'])
  }
  redirectToSettings(): void {
    this.router.navigate(['layout/settings'])
  }
  redirectToSupplers(): void {
    this.router.navigate(['layout/supplers'])
  }
  redirectToDialogs(): void {
    this.router.navigate(['layout/dialogs'])
  }
}
