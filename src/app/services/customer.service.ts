import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StafferRequest, StafferResponse } from '../models/staffer/staffer';
import { OperationResult } from '../models/common/operationResult';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerService {
  constructor(private http: HttpClient) { }

    addCustomer(requestBody: StafferRequest): Observable<OperationResult<number>> {
      return this.http.post<OperationResult<number>>('https://192.168.1.56:7202/api/staffer', requestBody);
    }

    getAllCustomers(): Observable<OperationResult<StafferResponse[]>> {
        return this.http.get<OperationResult<StafferResponse[]>>('https://192.168.1.56:7202/api/staffer/all');
    }
}
