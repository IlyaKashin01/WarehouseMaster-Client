import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Notification } from '../models/common/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input() notification: Notification = new Notification("", "");
  @Input() isShow: boolean = false;
  @Output() close = new EventEmitter<void>();
  subsctibtion: Subscription;
  constructor() {
      this.subsctibtion = interval(3000).subscribe(() => {
        this.onClose();
      })
    }    

  onClose() {
      this.close.emit();
  }
}
