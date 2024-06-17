import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule} from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { GroupService } from './services/group.service';
import { ChatService } from './services/chat.service';
import { DataService } from './services/data.service';
import { HubService } from './services/hub.service';
import { AuthService } from './services/auth.service';
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
        SidebarComponent,
        CommonModule,
      HttpClientModule
    ],
    providers: [
      ChatService, 
      GroupService, 
      DataService,
      HubService,
      AuthService
    ]
})
export class AppComponent {
  title = 'warehouse-master';
}
