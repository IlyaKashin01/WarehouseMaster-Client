import { Component } from '@angular/core';
import { TelegramAuthComponent } from '../telegram-auth/telegram-auth.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [TelegramAuthComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

}
