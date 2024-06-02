import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { TreeSelectModule } from 'primeng/treeselect';
import { CustomerService } from '../../services/customer.service';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { StafferRequest } from '../../models/staffer/staffer';
import { OperationResult } from '../../models/common/operationResult';

class Role {
  constructor(
    public Name: string = "",
    public Value: string = "",
    public Icon: string = ""
  ) { }
}

@Component({
  selector: 'app-add-customer-form',
  standalone: true,
  imports: [SidebarModule, ButtonModule, InputTextModule, AccordionModule, TreeSelectModule, CalendarModule, FormsModule, ReactiveFormsModule],
  providers: [CustomerService],
  templateUrl: './add-customer-form.component.html',
  styleUrl: './add-customer-form.component.css'
})
export class AddCustomerFormComponent {
  @Input() visible: boolean = false;
  @Output() closeForm = new EventEmitter<void>();
  firstName: string = "";
  lastName: string = "";
  middleName: string = "";
  email: string = "";
  role: string = "";
  birthday: Date = new Date();
  post: string = "";
  salary: string = "";
  showError: boolean = false;
  errorMessage: string = "";
  
  nodes: any[] = [
    {
      key: '0',
      label: 'Склад 1',
      icon: 'pi pi-fw pi-home',

    },
    {
      key: '1',
      label: 'Склад 2',
      icon: 'pi pi-fw pi-home',
    },
    {
      key: '2',
      label: 'Склад 3',
      icon: 'pi pi-fw pi-home',
    }];
  roles: Role[] = [
    {
      Value: 'moderator',
      Name: 'Управляющий',
      Icon: 'pi pi-fw pi-user',

    },
    {
      Value: 'customer',
      Name: 'Сотрудник',
      Icon: 'pi pi-fw pi-user',
    },
  ];
  close() {
    this.closeForm.emit();
  }
  constructor(private customerService : CustomerService,) { }
  save(): void {
      const selectedRole = this.roles.find(x => x.Name === this.role)
      if (selectedRole) {
        const newStaffer = new StafferRequest(
        this.firstName,
        this.lastName,
        this.middleName,
        this.email,
        new Date(),
        selectedRole.Value,
        this.post,
        30000,
        1
      );
      console.log('New Staffer:', newStaffer);
      this.customerService.addCustomer(newStaffer).subscribe({
        next: async (data: OperationResult<number>) => {
            if (data.result && data.success) {
                console.log(data.result);
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
      //this.close()
      }
      else {
        console.log('Role is null')
      }
  }
}
