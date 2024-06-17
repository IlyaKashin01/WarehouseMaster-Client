import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { DataService, PersonalDialog } from '../services/data.service';
import { HubService } from '../services/hub.service';
import { Dialog } from '../models/common/common';
import { GroupedMessages } from '../models/chat/chat';
import { PersonResponse } from '../models/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [FormsModule, CommonModule, MatIcon],
    providers: [],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
    @ViewChild('historyContainer') historyContainer!: ElementRef;

    person: PersonResponse = this.dataService.getPerson();
    message: string = "";

    personalMessages: GroupedMessages[] = [];

    recipientId: number = 0;
    personId: number = this.person.id;

    dialogs: Dialog[] = [];
    dialog: PersonalDialog = new PersonalDialog(0, "", "");
    onlineMarkers: number[] = [];

    groupId: number = 0;
    nameGroup: string = "";
    countMembers: number = 0;
    creatorLogin: string = "";

    nameDialogNotification: string = '';
    notification: string = '';

    showChat: boolean = false;
    showGroup: boolean = false;
    showUserForm: boolean = false;
    isGroupForm: boolean = false;
    showNotification: boolean = false;
    checked: boolean = false;

    subscribe: boolean = false;
    constructor(private chatHub: ChatService, private dataService: DataService, private hubService: HubService,) {
    }
    scrollToBottom(): void {
        if (this.historyContainer && this.historyContainer.nativeElement) {
            this.historyContainer.nativeElement.scrollTop = this.historyContainer.nativeElement.scrollHeight;
        }
    }
    async ngOnInit(): Promise<void> {
        this.dataService.dialog$.subscribe((value: PersonalDialog) => {
            this.dialog = value;
        });

        if (await this.hubService.getChatPromiseStart() !== null && this.subscribe === false) {
                await this.chatHub.errorSubscribe()
                await this.chatHub.subscribeAllPersonalMessages();
                await this.chatHub.subscribeNewPersonalMessages();
                await this.chatHub.subscribeMessagesWithNewStatus();
                await this.chatHub.subscribeOnlineMarkers();
            this.chatHub.personalmessages$.subscribe((messages: GroupedMessages[]) => {
                this.personalMessages = messages;
            });
            this.chatHub.error$.subscribe((error: string) => {
                if (error !== "")
                    console.error(error);
            })
            await this.chatHub.getOnlineMarkers();
            this.chatHub.onlineMarkers$.subscribe((markers: number[]) => {
                this.onlineMarkers = markers;
            });
            this.subscribe = true;
        }

        this.dataService.recipientId$.subscribe(async (id: number) => {
            if (id !== 0 && id !== this.recipientId) {
                await this.chatHub.getAllPersonalMessages(id);
                this.scrollToBottom();
            }
            this.recipientId = id;
        });
    }

    async sendMessage() {
        await this.chatHub.sendMessage(this.message, this.recipientId, false);
        this.message = '';
    }
    async changeStatusMessages() {
        this.checked = true;
        await this.dataService.setHideCounterKey(this.recipientId);
        await this.chatHub.ChangeStatusIncomingMessages(this.recipientId);
    }
}
