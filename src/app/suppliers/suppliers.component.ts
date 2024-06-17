import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { AddSupplerFormComponent } from '../forms/add-suppler-form/add-suppler-form.component';
import { WarehouseService } from '../services/warehouses.service';
import { ProviderResponse } from '../models/provider/provider';
import { OperationResult } from '../models/common/operationResult';

export interface Customer {
  id?: number;
  name?: string;
  company?: string;
  phone?: string;
  email?: number;
}

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, SidebarModule, AddSupplerFormComponent],
  providers: [WarehouseService],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit{
  customers: Customer[] = [{

  }];

  constructor(private warehouseService: WarehouseService) {}
  visible: boolean = false;
  providers: ProviderResponse[] = [];
  showError: boolean = false;
  errorMessage: string = "";

  close(){
    this.visible = false;
  }
  showDialog() {
      this.visible = true;
  }
  ngOnInit() {
    this.warehouseService.getAllProviders().subscribe({
      next: async (data: OperationResult<ProviderResponse[]>) => {
          if (data.result && data.success) {
              this.providers = data.result;
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
