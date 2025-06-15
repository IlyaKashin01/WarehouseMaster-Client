import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import {NgIf} from "@angular/common";

interface ProductRequest {
  name: string;
  description: string;
  nameCategory: string;
  nameSubCategory: string;
  cost: number;
  count: number;
  stafferId: number;
  warehouseId: number;
}

interface OperationResult<T> {
  success: boolean;
  message: string;
  result?: T;
}

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [SidebarModule, ButtonModule, InputTextModule, FormsModule, TreeSelectModule, NgIf],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css'
})
export class AddProductFormComponent {
  @Input() visible: boolean = false;
  @Output() closeForm = new EventEmitter<void>();

  name: string = "";
  description: string = "";
  nameCategory: string = "";
  nameSubCategory: string = "";
  cost: number = 0;
  count: number = 0;
  stafferId: number = 0;
  warehouseId: number = 0;
  showError: boolean = false;
  errorMessage: string = "";
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor() { }

  close(): void {
    this.visible = false;
    this.closeForm.emit();
  }

  save(): void {
    const product: ProductRequest = {
      name: this.name,
      description: this.description,
      nameCategory: this.nameCategory,
      nameSubCategory: this.nameSubCategory,
      cost: this.cost,
      count: this.count,
      stafferId: this.stafferId,
      warehouseId: this.warehouseId
    };

    fetch('https://192.168.1.56:7202/api/product/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then((data: OperationResult<ProductRequest>) => {
      if (data.success) {
        this.close();
      } else {
        this.showError = true;
        this.errorMessage = data.message;
      }
    })
    .catch(error => {
      this.showError = true;
      this.errorMessage = 'Произошла ошибка при создании товара';
      console.error('Error:', error);
    });
  }
}
