import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../services/auth.service';
import { CodeRequest, PassRequest, ResetRequest } from '../models/auth/auth';
import { OperationResult } from '../models/common/operationResult';
import { InputOtpModule } from 'primeng/inputotp';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatLabelModule, InputTextModule, ButtonModule, InputOtpModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  login: string = "";
  showError: boolean = false;
  errorMessage: string = "";
  confirm: boolean = false;
  resetCode: number = 0;
  changed: boolean = false;
  pass: string = "";
  onKeyLogin(event: any) {
    this.login = event.target.value;
  }

  onKeyNewPass(event: any) {
    this.pass = event.target.value;
  }
  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }
  getCode() {
    this.authService.getResetCode(new ResetRequest(this.login)).subscribe({
      next: async (data: OperationResult<boolean>) => {
        if (data.result && data.success) {
            this.confirm = true;
        }
        else {
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
  confirmCode(){
    this.authService.checkResetCode(new CodeRequest(this.login, this.resetCode)).subscribe({
      next: async (data: OperationResult<boolean>) => {
        if (data.result && data.success) {
          this.dataService.setResetLogin(this.login)
          this.router.navigate(['change-pass']);
        }
        else {
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
