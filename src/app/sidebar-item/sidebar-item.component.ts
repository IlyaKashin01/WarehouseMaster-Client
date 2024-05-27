import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatBadgeModule, CommonModule],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.css'
})
export class SidebarItemComponent {
  @Input() icon: string = "";
  @Input() label: string = "";
  @Input() badge?: string = "";
}
