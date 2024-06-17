import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OperationResult } from '../models/common/operationResult';
import { Observable } from 'rxjs';

class TelegramAuth{
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public usetname: string,
    public authDate: number,
    public hash: string,
  ){}
}
@Component({
  selector: 'app-telegram-auth',
  templateUrl: './telegram-auth.component.html',
  styleUrls: ['./telegram-auth.component.css'],
  standalone: true,
  imports: []
})

export class TelegramAuthComponent implements AfterViewInit {

  constructor(private router: Router, private http: HttpClient) { }

  @ViewChild('script', { static: false }) script: ElementRef<HTMLScriptElement> = {} as ElementRef;
  
  @Input() botName: string = "WarehouseMasterBot";
  showError: boolean = false;
  errorMessage: string = "";
  convertToScript() {
    const element = this.script.nativeElement;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', this.botName);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    element.parentElement!.replaceChild(script, element);
  }

  ngAfterViewInit(): void {
    this.convertToScript();
    // Экспортируем функцию в глобальную область видимости, чтобы Telegram виджет мог её вызывать
    (window as any).onTelegramAuth = this.onTelegramAuth.bind(this);
  }

  onTelegramAuth(user: any): void {
    console.log('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
    // Вы можете здесь также вызвать метод сервиса для отправки данных на ваш сервер
    this.signUpRequest(new TelegramAuth(user.id, user.first_name, user.last_name, user.username, 0, "" )).subscribe({
      next: async (data: OperationResult<number>) => {
          if (data.result && data.success) {
              this.router.navigate([''])
          }
          else
          {
              this.showError = true;
              this.errorMessage = data.message;
              console.log(this.errorMessage);
          }
      },
      error: error => {
          console.error(error)
          this.showError = true;
          this.errorMessage = error.error.message;
      }
  });
    this.router.navigate(['layout'])
  }
  signUpRequest(requestBody: TelegramAuth): Observable<OperationResult<number>> {
    return this.http.post<OperationResult<number>>('https://localhost:7130/api/auth/tg-signup', requestBody);
}
}
