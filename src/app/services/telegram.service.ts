import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { TelegramAuthResponse } from '../models/telegram/tgResponse';

@Injectable({
  providedIn: 'root'
})
export class TelegramLoginService {
  telegramAuthResponse = {} as TelegramAuthResponse;
  responseUpdated = new Subject();

  constructor() {
    //window['telegramCallback'] = loginData : number => this.telegramCallback(loginData);
  }

  private telegramCallback(telegramAuthResponse: TelegramAuthResponse) {
    // You can subscribe on it in component and send it to backend.
    this.responseUpdated.next(telegramAuthResponse);
  }

  getTelegramLoginResponse(): TelegramAuthResponse {
    return this.telegramAuthResponse;
  }
}