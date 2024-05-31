import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {SplitterModule} from "primeng/splitter";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    MatSidenavModule,
    RouterOutlet,
    SplitterModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
