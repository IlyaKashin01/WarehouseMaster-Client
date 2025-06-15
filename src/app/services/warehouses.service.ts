import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OperationResult } from '../models/common/operationResult';
import { Observable } from 'rxjs';
import { WarehouseRequest, WarehouseResponse } from '../models/warehouse/warehouse';
import { ShipmentResponse } from '../models/shipment/shipment';
import { EntranceResponse } from '../models/entrance/entrance';
import { DataService } from './data.service';
import { ProviderResponse } from '../models/provider/provider';
import { ProductResponse } from '../models/product/product';

@Injectable()
export class WarehouseService {
  constructor(private http: HttpClient, private dataService: DataService) { }

    addWarehouse(requestBody: WarehouseRequest): Observable<OperationResult<WarehouseRequest>> {
        return this.http.post<OperationResult<WarehouseRequest>>('https://192.168.1.56:7202/api/warehouse/create', requestBody);
    }

    getAllWarehouses(): Observable<OperationResult<WarehouseResponse[]>> {
        return this.http.get<OperationResult<WarehouseResponse[]>>('https://192.168.1.56:7202/api/warehouse/all');
    }

    getAllShipment(warehouseId : number): Observable<OperationResult<ShipmentResponse[]>> {
        const params = new HttpParams().set('warehouseId', warehouseId)
        return this.http.get<OperationResult<ShipmentResponse[]>>('https://192.168.1.56:7202/api/shipment/getAll', {params},);
    }
    getAllEntrance(warehouseId: number): Observable<OperationResult<EntranceResponse[]>> {
        const params = new HttpParams().set('warehouseId', warehouseId)
        return this.http.get<OperationResult<EntranceResponse[]>>('https://192.168.1.56:7202/api/entrance/getAll', {params},);
    }
    getAllProducts(warehouseId: number): Observable<OperationResult<ProductResponse[]>> {
        const params = new HttpParams().set('warehouseId', warehouseId)
        return this.http.get<OperationResult<ProductResponse[]>>('https://192.168.1.56:7202/api/product/all', {params},);
    }
    getAllProviders(): Observable<OperationResult<ProviderResponse[]>> {
        return this.http.get<OperationResult<ProviderResponse[]>>('https://192.168.1.56:7202/api/provider/getAll');
    }
}
