import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatExpansionModule,
        MatBadgeModule,
        SidebarComponent
    ]
})
export class AppComponent {
  title = 'warehouse-master';
}
