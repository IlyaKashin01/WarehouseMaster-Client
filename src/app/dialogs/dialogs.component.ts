import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GroupParams } from '../models/group/group';
import { Dialog, LastMessage, Notification } from '../models/common/common';
import { PersonResponse } from '../models/auth/auth';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ChatService } from '../services/chat.service';
import { GroupService } from '../services/group.service';
import { DataService } from '../services/data.service';
import { HubService } from '../services/hub.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddChatFormComponent } from '../forms/add-chat-form/add-chat-form.component';
import { ChatComponent } from '../chat/chat.component';
import { NotificationComponent } from '../notification/notification.component';
import { AddGroupFormComponent } from '../forms/add-group-form/add-group-form.component';
import { MatIcon } from '@angular/material/icon';
import { LastMessageComponent } from '../last-message/last-message.component';

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [CommonModule, FormsModule, AddChatFormComponent, ChatComponent, NotificationComponent, AddGroupFormComponent, MatIcon, RouterOutlet, LastMessageComponent],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.css'
})
export class DialogsComponent implements OnInit{
  person: PersonResponse = this.dataService.getPerson();

  recipientId: number = 0;
  personId: number = this.person.id;

  dialogs: Dialog[] = [];
  onlineMarkers: number[] = [];
  hideCounterKey: number = 0;
  isNewDialog: boolean = false;

  notification: Notification = new Notification("", "");

  showUserForm: boolean = false;
  isGroupForm: boolean = false;
  showNotification: boolean = false;
  groupSubscribe: boolean = false;
  chatSubscribe: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private chatHub: ChatService, private groupHub: GroupService, private dataService: DataService, private hubService: HubService, private cdr: ChangeDetectorRef) {
  }

    async ngOnInit(): Promise<void> {
        if (await this.hubService.getChatPromiseStart() !== null && this.chatSubscribe === false) {
            await this.chatHub.errorSubscribe()
            await this.chatHub.subscribeOnlineMarkers();
            await this.chatHub.subscribeNotification();
            await this.chatHub.subscribeDialogs();
            await this.chatHub.subscribeNewDialog();
            this.chatHub.dialogs$.subscribe((dialogs: Dialog[]) => {
                this.dialogs = dialogs;
            });
            this.chatHub.dialog$.subscribe((dialog: Dialog) => {
                this.isNewDialog = true;
                this.dialogs.push(dialog);
                this.dialogs.sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
            });
            await this.chatHub.getDialogs();
            await this.chatHub.getOnlineMarkers();
            this.chatHub.onlineMarkers$.subscribe((markers: number[]) => {
                this.onlineMarkers = markers;
            });
            this.chatHub.notification$.subscribe((notification: Notification) => {
                if (!this.isNewDialog) {
                    const dialog = this.dialogs.find(x => x.name === notification.title);
                    if (dialog) dialog.countUnreadMessages++;
                }
                this.notification = notification;
                if (this.notification.message !== '')
                    this.showNotification = true;
            });
            this.chatHub.error$.subscribe((error: string) => {
                if (error !== "")
                    console.error(error);
            });
            this.chatHub.lastMessages$.subscribe((messages: LastMessage[]) =>{
                messages.forEach(message => {
                    const chat = this.dialogs.find(x => x.id === message.dialogId && x.isGroup === false)
                    if(chat){
                        chat.lastMessage = message.message;
                        chat.sentAt = message.sentAt;
                        chat.isCheck = message.isCheck;
                        chat.senderLogin = message.senderLogin;
                    }
                });
            })
            this.chatSubscribe = true;
        }
        if (await this.hubService.getGroupPromiseStart() !== null && !this.groupSubscribe) {
            await this.groupHub.subscribeNotification();
            this.groupHub.notification$.subscribe((notification: Notification) => {
                const dialog = this.dialogs.find(x => x.name === notification.title);
                if (dialog) dialog.countUnreadMessages++;
                this.notification = notification;
                if (this.notification.message !== '')
                    this.showNotification = true;
            });
            await this.groupHub.subscribeNewGroup();
            this.groupHub.newGroup$.subscribe((dialog: Dialog) => {
                if (dialog.id !== 0) {
                    this.dialogs.push(dialog);
                    this.dialogs.sort((a, b) => a.name.localeCompare(b.name));
                }
            });
            this.groupHub.lastMessage$.subscribe((message: LastMessage) =>{
                const group = this.dialogs.find(x => x.id === message.dialogId && x.isGroup)
                if(group){
                    group.lastMessage = message.message;
                    group.sentAt = message.sentAt;
                    group.isCheck = message.isCheck;
                    group.senderLogin = message.senderLogin;
                }
            })
            this.groupSubscribe = true;
        }
        this.dataService.hideCounterKey$.subscribe((value: number) => {
            const dialog = this.dialogs.find(x => x.id === value);
            if(dialog) dialog.countUnreadMessages = 0;
        })
    }

  close() {
      this.showNotification = false;
  }

  async onKeyChat(id: number, name: string, avatar: string, countUnreadMessages: number) {
      if (countUnreadMessages > 0) {
        await this.chatHub.ChangeStatusIncomingMessages(id);
        const dialog = this.dialogs.find(x => x.name === name);
        if(dialog) dialog.countUnreadMessages = 0;
      }
      this.dataService.setDialog(id,name, avatar);
      this.dataService.setRecipientId(id);
      this.router.navigate(['chat'], {relativeTo: this.route});
  }

  async onKeyGroup(id: number, name: string, countMembers: number, creatorLogin: string, countUnreadMessages: number) {
      await this.dataService.setGroupParams(new GroupParams(name, countMembers, id, creatorLogin, this.person.login, this.onlineMarkers));
      if (countUnreadMessages > 0) {
        await this.groupHub.ChangeStatusIncomingMessages(id, name);
        const dialog = this.dialogs.find(x => x.name === name);
        if(dialog) dialog.countUnreadMessages = 0;
      }
      this.router.navigate(['group'], {relativeTo: this.route});
  }

  async logout() {
      await this.groupHub.onDisconnectedGroups();
      this.hubService.DisconnectionChatHub();
      this.hubService.DisconnectionGroupHub();
      this.router.navigate(['']);
  }
  openUserForm() {
      this.showUserForm = true;
  }

  closeUserForm() {
      this.showUserForm = false;
  }
  openGroupForm() {
      this.isGroupForm = true;
  }

  closeGroupForm() {
      this.isGroupForm = false;
  }

  getLastMessage(message: string, isCheck: boolean, sentAt: Date, login: string): LastMessage
  {
    return new LastMessage(0,message, isCheck, new Date(sentAt), login);
  }
}
