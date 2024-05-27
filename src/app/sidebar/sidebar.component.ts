import { Component } from '@angular/core';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarItemComponent, MatIconModule, MatExpansionModule, MatSidenavModule, MatToolbarModule, MatListModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
