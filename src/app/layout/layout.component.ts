import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {SplitterModule} from "primeng/splitter";
import {SidebarModule} from "primeng/sidebar";
import {AvatarModule} from "primeng/avatar";
import {BadgeModule} from "primeng/badge";
import {TagModule} from "primeng/tag";
import { DataService } from '../services/data.service';
import { PersonResponse } from '../models/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HubService } from '../services/hub.service';
import { ChatService } from '../services/chat.service';

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
    TagModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  person: PersonResponse = this.dataService.getPerson();
  onlineMarkers: number[] = [];
  constructor (private dataService: DataService, private hubService: HubService, private chatHub: ChatService) {}
  async ngOnInit(): Promise<void> {
    if (await this.hubService.getChatPromiseStart() !== null) {
      await this.chatHub.subscribeOnlineMarkers();
      await this.chatHub.getOnlineMarkers();
            this.chatHub.onlineMarkers$.subscribe((markers: number[]) => {
                this.onlineMarkers = markers;
            });
    }
  }
}
