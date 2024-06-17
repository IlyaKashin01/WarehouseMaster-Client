import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest, AuthResponse, CodeRequest, PassRequest, ResetRequest, SignUpRequest } from '../models/auth/auth';
import { OperationResult } from '../models/common/operationResult';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    signInRequest(requestBody: AuthRequest): Observable<OperationResult<AuthResponse>> {
        return this.http.post<OperationResult<AuthResponse>>('https://localhost:7130/api/auth/signin', requestBody);
    }

    signUpRequest(requestBody: SignUpRequest): Observable<OperationResult<number>> {
        return this.http.post<OperationResult<number>>('https://localhost:7130/api/auth/signup', requestBody);
    }

    getResetCode(request: ResetRequest): Observable<OperationResult<boolean>> {
        return this.http.post<OperationResult<boolean>>('https://localhost:7130/api/password/get-reset-code', request);
    }
    checkResetCode(request: CodeRequest): Observable<OperationResult<boolean>> {
        return this.http.post<OperationResult<boolean>>('https://localhost:7130/api/password/check-reset-code', request);
    }
    changePass(request: PassRequest): Observable<OperationResult<boolean>> {
        return this.http.put<OperationResult<boolean>>('https://localhost:7130/api/password/change-pass', request);
    }
}