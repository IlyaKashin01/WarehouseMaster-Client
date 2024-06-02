import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { AddSupplerFormComponent } from '../forms/add-suppler-form/add-suppler-form.component';

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
  providers: [CustomerService],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent {
  customers: Customer[] = [{

  }];

  constructor(private customerService: CustomerService) {}
  visible: boolean = false;

  close(){
    this.visible = false;
  }
  showDialog() {
      this.visible = true;
  }
  ngOnInit() {
      
  }
}
