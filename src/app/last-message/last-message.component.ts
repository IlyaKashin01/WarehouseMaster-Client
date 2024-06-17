import { Component, Input } from '@angular/core';
import { LastMessage } from '../models/common/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-last-message',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './last-message.component.html',
  styleUrl: './last-message.component.css'
})
export class LastMessageComponent {
  currentDate = new Date();
  @Input() lastMessage: LastMessage = new LastMessage(0,"", false, new Date(), "")
  @Input() personLogin: string = "";

  isDifferentYear(sentAt: Date): boolean {
    return sentAt.getFullYear() !== this.currentDate.getFullYear();
  }

  isDifferentDay(sentAt: Date): boolean {
    return sentAt.getDate() !== this.currentDate.getDate();
  }
}
