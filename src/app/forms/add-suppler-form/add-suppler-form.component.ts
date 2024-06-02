import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { TreeSelectModule } from 'primeng/treeselect';

@Component({
  selector: 'app-add-suppler-form',
  standalone: true,
  imports: [SidebarModule, ButtonModule, InputTextModule, AccordionModule, TreeSelectModule],
  providers: [],
  templateUrl: './add-suppler-form.component.html',
  styleUrl: './add-suppler-form.component.css'
})
export class AddSupplerFormComponent {
  @Input() visible: boolean = false;
  @Output() closeForm = new EventEmitter<void>();
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
  close() {
    this.closeForm.emit();
  }
  constructor() {
  }
}
