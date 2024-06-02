import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {SplitterModule} from "primeng/splitter";
import {SidebarModule} from "primeng/sidebar";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    MatSidenavModule,
    RouterOutlet,
    SplitterModule,
    SidebarModule,
    AvatarModule,
    BadgeModule,
    TagModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
