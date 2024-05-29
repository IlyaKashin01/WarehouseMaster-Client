import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, 
  imports: [ChartModule, CardModule, TableModule]
})
export class DashboardComponent implements OnInit {
  totalShipment = 534;
  totalShipmentChange = "+32% vs last month";
  complete = 109;
  completeChange = "+21% vs last month";
  pending = 293;
  pendingChange = "+72% vs last month";
  refund = 23;
  refundChange = "-10% vs last month";
  deliveryVehicles = 659;
  deliveryVehiclesChange = "+7% vs last month";
  shipmentAnalyticsData: any;
  popularCityData: any;
  paymentHistory = [
    { vehicleNumber: '35784-908', vehicleType: 'Truck', driverName: 'Adam Arthur', vehicleStatus: 'Active', lastLocation: '2834 Richards Dr, Richardson, California 62639' },
    { vehicleNumber: '35784-908', vehicleType: 'Motorcycle', driverName: 'Brooklyn Simmons', vehicleStatus: 'Inactive', lastLocation: '2838 Elm St, Celina, Delaware' },
    // Add more data as needed
  ];

  ngOnInit() {
    this.shipmentAnalyticsData = {
      datasets: [
        {
          label: 'Complete',
          data: [{ x: new Date('2023-01-01'), y: 20 }, { x: new Date('2023-02-01'), y: 30 }, /* more data */],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Pending',
          data: [{ x: new Date('2023-01-01'), y: 10 }, { x: new Date('2023-02-01'), y: 20 }, /* more data */],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }
      ]
    };

    this.popularCityData = {
      labels: ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Bekasi'],
      datasets: [
        {
          label: 'Popularity',
          data: [56, 32, 24, 19, 15],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  }
}
