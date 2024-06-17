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
  selector: 'app-signup',
  standalone: true,
  imports: [TelegramAuthComponent, CommonModule, FormsModule, FloatLabelModule , InputTextModule, ButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  registrationForm: FormGroup;
    showError: boolean = false;
    errorMessage: string = "";

    constructor(private authService: AuthService, private router: Router, private tokenService: DataService, private hubService: HubService, private formBuilder: FormBuilder) { 
        this.registrationForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
            password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[\d!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/)]],
            confirmPassword: ['', Validators.required],
          }, { validators: this.passwordMatchValidator });
    }
    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')!.value;
        const confirmPassword = form.get('confirmPassword')!.value;

        return password === confirmPassword ? null : { mismatch: true };
    }
    async signup(form: FormGroup) {
        if (this.registrationForm.valid){
            console.log("Регистрационные данные:", this.registrationForm.value);
            this.authService.signUpRequest(new SignUpRequest(form.get('username')!.value, form.get('password')!.value)).subscribe({
                next: async (data: OperationResult<number>) => {
                    if (data.result && data.success) {
                        await this.login(form);
                    }
                },
                error: error => {
                    console.error(error);
                    this.showError = true;
                    this.errorMessage = error.error.message;
                }
            });
        }
        else{
            console.log("Форма содержит ошибки. Детали:");
            for (const controlName in this.registrationForm.controls) {
                if (this.registrationForm.controls.hasOwnProperty(controlName)) {
                    const control = this.registrationForm.get(controlName);
                    console.log(`${controlName}:`, control?.errors);
                }
            }
            this.registrationForm.markAllAsTouched();
        }
    }

    private async login(form: FormGroup) {
        this.authService.signInRequest(new AuthRequest(form.get('username')!.value, form.get('password')!.value)).subscribe({
            next: async (data: OperationResult<AuthResponse>) => {
                if (data.result && data.success) {
                    await this.tokenService.setToken(data.result.token);
                    await this.tokenService.setPerson(data.result.person);
                    if (await this.hubService.ConnectionChatHub(data.result.token, data.result.person.id)
                        && await this.hubService.ConnectionGroupHub(data.result.token, data.result.person.id)) {
                        this.router.navigate(['layout']);
                    }
                }
            },
            error: error => console.error(error)
        });
    }

    goToSignIn() {
        this.router.navigate(['']);
    }
}
