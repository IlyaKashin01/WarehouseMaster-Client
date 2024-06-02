import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { AddCustomerFormComponent } from '../forms/add-customer-form/add-customer-form.component';
import { OperationResult } from '../models/common/operationResult';
import { StafferResponse } from '../models/staffer/staffer';

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [TableModule, CommonModule, DialogModule, ButtonModule, InputTextModule, SidebarModule, AddCustomerFormComponent],
  providers: [CustomerService],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers: StafferResponse[] = [];
  showError: boolean = false;
  errorMessage: string = "";

  constructor(private customerService: CustomerService) {}
  visible: boolean = false;

  close(){
    this.visible = false;
  }
  showDialog() {
      this.visible = true;
  }
  ngOnInit() {
    this.getCustomers()
  }

  async getCustomers() {
    this.customerService.getAllCustomers().subscribe({
        next: async (data: OperationResult<StafferResponse[]>) => {
            if (data.result && data.success) {
                this.customers = data.result;
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
