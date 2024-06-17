import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GroupParams, GroupedMessagesInGroup, LeaveGroupRequest } from '../models/group/group';
import { DataService } from '../services/data.service';
import { HubService } from '../services/hub.service';
import { GroupService } from '../services/group.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { AddMemberFormComponent } from '../forms/add-member-form/add-member-form.component';
import { GroupInfoFormComponent } from '../forms/group-info-form/group-info-form.component';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIcon, AddMemberFormComponent, GroupInfoFormComponent,],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit{
  @ViewChild('history') history!: ElementRef;

  nameGroup: string = "";
  countMembers: number = 0;
  groupId: number = 0;
  creatorLogin: string = "";
  personLogin: string = "";
  onlineMarkers: number[] = [];

  message: string = "";

  groupMessages: GroupedMessagesInGroup[] = [];
  addedNotifications: string[] = [''];
  groupName: string = '';
  notification: string = '';
  showNotification: boolean = false;
  personId: number = this.dataService.getPerson().id;
  isOpen: boolean = false;
  isOpenWindow: boolean = false;
  isSubsctibed: boolean = false;
  personStatus: boolean = false;

  constructor(private groupHub: GroupService, private dataService: DataService, private hubService: HubService) {
  }

  async ngOnInit(): Promise<void> {
      if (this.hubService.getGroupPromiseStart !== null) {
          if (!this.isSubsctibed) {
              await this.groupHub.errorSubscribe();
              await this.groupHub.subscribeGroupMessages();
              await this.groupHub.subscribeNewGroupMessages();
              await this.groupHub.subscribeJoinPersonToGroup();
              await this.groupHub.subscribeMessagesWithNewStatus();
              await this.groupHub.subscribePersonStatus();
              this.groupHub.groupmessages$.subscribe((messages: GroupedMessagesInGroup[]) => {
                  this.groupMessages = messages;
              });
              this.groupHub.status$.subscribe((status: boolean) => {
                  this.personStatus = status;
              })
              this.groupHub.error$.subscribe((error: string) => {
                  if (error !== "") console.error(error);
              })
              this.isSubsctibed = true;
          }
      }
      this.dataService.groupParams$.subscribe(async (params: GroupParams) => {
          await this.groupHub.getGroupMessages(params.groupId);
          this.nameGroup = params.nameGroup;
          this.countMembers = params.countMembers;
          this.groupId = params.groupId;
          this.creatorLogin = params.creatorLogin;
          this.personLogin = params.personLogin;
          this.onlineMarkers = params.onlineMarkers;
          this.scrollToBottom();
      });
  }
  scrollToBottom(): void {
      if (this.history && this.history.nativeElement) {
        this.history.nativeElement.scrollTop = this.history.nativeElement.scrollHeight;
      }
  }
  openForm() {
      this.isOpen = true;
  }
  closeForm() {
      this.isOpen = false;
  }
  openWindow() {
      this.isOpenWindow = true;
  }
  closeWindow() {
      this.isOpenWindow = false;
  }
  close() {
      this.showNotification = false;
  }
  async createGroup(name: string) {
      await this.groupHub.createGroup(name);
  }
  async sendGroupMessage() {
      await this.groupHub.sendGroupMessage(this.groupId, this.message);
      this.message = "";
  }
  async joinPersonToGroup(groupId: number, memberId: number) {
      await this.groupHub.joinPersonToGroup(groupId, memberId);
      this.isOpen = false;
  }
  async changeStatusMessages() {
      if(this.groupMessages.find(x => x.messages.find(x => x.isCheck === false && x.senderId !== this.personId)) !== null){
      await this.dataService.setHideCounterKey(this.groupId);
      await this.groupHub.ChangeStatusIncomingMessages(this.groupId, this.nameGroup);
      }
  }
  async leaveGroup() {
      await this.groupHub.LeaveGroup(new LeaveGroupRequest(this.groupId, this.personId, this.personLogin, "", false));
      console.log(this.groupId);
      
  }
  async returnToGroup() {
      await this.groupHub.ReturnToGroup(this.groupId, this.nameGroup, this.personLogin);
  }
}
