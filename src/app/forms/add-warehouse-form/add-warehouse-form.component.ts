import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { WarehouseService } from '../../services/warehouses.service';
import { WarehouseRequest } from '../../models/warehouse/warehouse';
import { OperationResult } from '../../models/common/operationResult';

@Component({
  selector: 'app-add-warehouse-form',
  standalone: true,
  imports: [SidebarModule, ButtonModule, InputTextModule, FormsModule],
  providers: [WarehouseService],
  templateUrl: './add-warehouse-form.component.html',
  styleUrl: './add-warehouse-form.component.css'
})
export class AddWarehouseFormComponent {
  @Input() visible: boolean = false;
  @Output() closeForm = new EventEmitter<void>();

  name: string = "";
  purpose: string = "";
  address: string = "";
  square: number = 0;
  countEmployees: number = 0;
  countTechnic: number = 0;
  capacity: number = 0;
  occupancy: number = 0;
  showError: boolean = false;
  errorMessage: string = "";

  constructor(private warehouseService: WarehouseService) { }

  close() {
    this.closeForm.emit();
  }

  save(): void {
    const newWarehouse = new WarehouseRequest(
      this.name,
      this.purpose,
      this.address,
      this.square,
      this.countEmployees,
      this.countTechnic,
      this.capacity,
      this.occupancy
    );

    this.warehouseService.addWarehouse(newWarehouse).subscribe({
      next: (data: OperationResult<WarehouseRequest>) => {
        if (data.success) {
          this.close();
        } else {
          this.showError = true;
          this.errorMessage = data.message;
        }
      },
      error: error => {
        console.error(error);
        this.showError = true;
        this.errorMessage = error.error.message;
      }
    });
  }
}