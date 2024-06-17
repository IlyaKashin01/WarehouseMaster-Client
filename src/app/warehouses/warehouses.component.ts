import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { WarehouseService } from '../services/warehouses.service';
import { WarehouseResponse } from '../models/warehouse/warehouse';
import { OperationResult } from '../models/common/operationResult';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [CardModule, ButtonModule, ProgressBarModule, RouterOutlet, NgFor],
  providers: [WarehouseService],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.css'
})
export class WarehousesComponent implements OnInit {
  transition: boolean = false;
  warehouses: WarehouseResponse[] = []
  showError: boolean = false;
  errorMessage: string = "";

  constructor(private router: Router, private warehouseService: WarehouseService, private dataService: DataService){}
  ngOnInit(): void {
    this.getWarehouses()
  }
  click (id: number) {
    this.transition = true;
    this.dataService.setWarehouseId(id)
    this.router.navigate(['layout/details'])
  }
  getOccupancyRate(warehouse: any): number {
    return (warehouse.occupancy / warehouse.capacity) * 100;
  }

  getWarehouses(){
    this.warehouseService.getAllWarehouses().subscribe({
      next: async (data: OperationResult<WarehouseResponse[]>) => {
          if (data.result && data.success) {
              this.warehouses = data.result;
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
