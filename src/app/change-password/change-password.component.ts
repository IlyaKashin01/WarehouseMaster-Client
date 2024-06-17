import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputOtpModule } from 'primeng/inputotp';
import { InputTextModule } from 'primeng/inputtext';
import { OperationResult } from '../models/common/operationResult';
import { CodeRequest, PassRequest, ResetRequest } from '../models/auth/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatLabelModule, InputTextModule, ButtonModule, InputOtpModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  login: string = this.dataService.getGetResetLogin();
  showError: boolean = false;
  errorMessage: string = "";
  confirm: boolean = false;
  resetCode: number = 0;
  changed: boolean = false;
  pass: string = "";

  onKeyNewPass(event: any) {
    this.pass = event.target.value;
  }
  constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }
  changePass(){
    this.authService.changePass(new PassRequest(this.login, this.pass)).subscribe({
      next: async (data: OperationResult<boolean>) => {
        if (data.result && data.success) {
          this.router.navigate(['']);
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
