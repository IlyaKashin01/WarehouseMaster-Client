import { Component } from '@angular/core';
import { TelegramAuthComponent } from '../telegram-auth/telegram-auth.component';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from "primeng/floatlabel"  
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { HubService } from '../services/hub.service';
import { AuthRequest, AuthResponse, SignUpRequest } from '../models/auth/auth';
import { OperationResult } from '../models/common/operationResult';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [TelegramAuthComponent, CommonModule, FormsModule, FloatLabelModule , InputTextModule, ButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
    username: string = "";
    password: string = "";
    showError: boolean = false;
    errorMessage: string = "";
    constructor(private authService: AuthService, private router: Router, private tokenService: DataService, private hubService: HubService) { }

    onKeyLogin(event: any) {
        this.username = event.target.value;
    }
    onKeyPass(event: any) {
        this.password = event.target.value;
    }
    goToSignUp(){
        this.router.navigate(['/signup']);
    }
    goChangePass(){
        this.router.navigate(['/reset-pass']);
    }
    async login() {
        this.authService.signInRequest(new AuthRequest(this.username, this.password)).subscribe({
            next: async (data: OperationResult<AuthResponse>) => {
                if (data.result && data.success) {
                    await this.tokenService.setToken(data.result.token);
                    await this.tokenService.setPerson(data.result.person);
                    if (await this.hubService.ConnectionChatHub(data.result.token, data.result.person.id)
                        && await this.hubService.ConnectionGroupHub(data.result.token, data.result.person.id)) {
                        this.router.navigate(['layout']);
                    }
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
    }
}
