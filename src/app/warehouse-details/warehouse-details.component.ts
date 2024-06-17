import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { WarehouseService } from '../services/warehouses.service';
import { ShipmentResponse } from '../models/shipment/shipment';
import { OperationResult } from '../models/common/operationResult';
import { EntranceResponse } from '../models/entrance/entrance';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ProductResponse } from '../models/product/product';

@Component({
  selector: 'app-warehouse-details',
  standalone: true,
  imports: [CardModule, TagModule, ChartModule, TabViewModule, TableModule, CommonModule, FormsModule],
  providers: [WarehouseService],
  templateUrl: './warehouse-details.component.html',
  styleUrl: './warehouse-details.component.css'
})
export class WarehouseDetailsComponent implements OnInit{
  shipment: ShipmentResponse[] = [];
  entrance: EntranceResponse[] = [];
  products: ProductResponse[] = [];
  showError: boolean = false;
  errorMessage: string = "";
  warehouseId: number = 0;

  constructor(private warehouseService: WarehouseService, private dataService: DataService) {}

  ngOnInit(): void {
    this.warehouseId= this.dataService.getWarehouseId()
    this.getShipment(this.warehouseId);
    this.getEntrance(this.warehouseId);
    this.getProducts(this.warehouseId);
  }

  checkDate(date: Date){
    return new Date(date).toDateString() === new Date("0001-01-01T00:00:00").toDateString()
  }
  getShipment(warehouseId : number){
    this.warehouseService.getAllShipment(warehouseId).subscribe({
      next: async (data: OperationResult<ShipmentResponse[]>) => {
          if (data.result && data.success) {
              this.shipment = data.result;
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
  getEntrance(warehouseId : number){
    this.warehouseService.getAllEntrance(warehouseId).subscribe({
      next: async (data: OperationResult<EntranceResponse[]>) => {
          if (data.result && data.success) {
              this.entrance = data.result;
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
  getProducts(warehouseId : number){
    this.warehouseService.getAllProducts(warehouseId).subscribe({
      next: async (data: OperationResult<ProductResponse[]>) => {
          if (data.result && data.success) {
              this.products = data.result;
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
