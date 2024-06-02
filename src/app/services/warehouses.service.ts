import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OperationResult } from '../models/common/operationResult';
import { Observable } from 'rxjs';
import { WarehouseRequest, WarehouseResponse } from '../models/warehouse/warehouse';

@Injectable()
export class WarehouseService {
  constructor(private http: HttpClient) { }

    addWarehouse(requestBody: WarehouseRequest): Observable<OperationResult<WarehouseRequest>> {
        return this.http.post<OperationResult<WarehouseRequest>>('https://localhost:7202/api/warehouse', requestBody);
    }

    getAllWarehouses(): Observable<OperationResult<WarehouseResponse[]>> {
        return this.http.get<OperationResult<WarehouseResponse[]>>('https://localhost:7202/api/warehouse');
    }
}
