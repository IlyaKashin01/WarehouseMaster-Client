import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-warehouse-details',
  standalone: true,
  imports: [CardModule, TagModule, ChartModule, TabViewModule],
  templateUrl: './warehouse-details.component.html',
  styleUrl: './warehouse-details.component.css'
})
export class WarehouseDetailsComponent implements OnInit{
  
  constructor() {}

  ngOnInit(): void {
  }
}
