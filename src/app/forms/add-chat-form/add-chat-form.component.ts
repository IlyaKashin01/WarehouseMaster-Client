import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HubService } from '../../services/hub.service';
import { PersonResponse } from '../../models/auth/auth';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-chat-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [],
  templateUrl: './add-chat-form.component.html',
  styleUrl: './add-chat-form.component.css'
})
export class AddChatFormComponent implements OnInit{
  users: PersonResponse[] = [];
  @Output() closeForm = new EventEmitter<void>();
  selectedUserId: number = 0;
  message: string = "";
  isSelected: boolean = false;
  constructor(private chatHub: ChatService, private hubService: HubService) {
  }
  async ngOnInit(): Promise<void> {
      if (await this.hubService.getChatPromiseStart() !== null) {
      this.chatHub.subscribeUsers();
      this.chatHub.users$.subscribe((users: PersonResponse[]) => {
          this.users = users;
      });
      await this.chatHub.getUsers();
      }
  }
  close() {
      this.closeForm.emit();
  }

  selectUser(user: PersonResponse) {
      this.selectedUserId = user.id;
      this.isSelected = true;
  }

  cancel() {
      this.message = "";
      this.close();
  }

  send() {
      this.chatHub.sendMessage(this.message, this.selectedUserId, true);
      console.log('Sending message:', this.message);
      this.close();
  }
}
