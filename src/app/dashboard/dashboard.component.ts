import {Component, OnInit} from '@angular/core';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';
import {RatingModule} from 'primeng/rating';
import {FormsModule} from "@angular/forms";
import 'chartjs-adapter-date-fns';
import {ProductService} from "../services/product.service";

interface Column {
  field: string;
  header: string;
}

interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [ChartModule, CardModule, TableModule, TagModule, RatingModule, FormsModule],
  providers: [ProductService]
})
export class DashboardComponent implements OnInit {
  products!: Product[];
  cols!: Column[];

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
    {
      vehicleNumber: '35784-908',
      vehicleType: 'Truck',
      driverName: 'Adam Arthur',
      vehicleStatus: 'Active',
      lastLocation: '2834 Richards Dr, Richardson, California 62639'
    },
    {
      vehicleNumber: '35784-908',
      vehicleType: 'Motorcycle',
      driverName: 'Brooklyn Simmons',
      vehicleStatus: 'Inactive',
      lastLocation: '2838 Elm St, Celina, Delaware'
    },
    // Add more data as needed
  ];

  constructor(private productService: ProductService) {
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });

    this.cols = [
      {field: 'code', header: 'Code'},
      {field: 'name', header: 'Name'},
      {field: 'category', header: 'Category'},
      {field: 'quantity', header: 'Quantity'},
      {field: 'inventoryStatus', header: 'Status'},
      {field: 'rating', header: 'Rating'}
    ];
    this.shipmentAnalyticsData = {
      datasets: [
        {
          label: 'Доходы',
          data: [
            {x: new Date('2023-01-10'), y: 65},
            {x: new Date('2023-01-30'), y: 59},
            {x: new Date('2023-02-01'), y: 80},
            {x: new Date('2023-03-15'), y: 81},
            {x: new Date('2023-04-16'), y: 56},
            {x: new Date('2023-05-01'), y: 55},
            {x: new Date('2023-05-20'), y: 44},
          ],
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          borderWidth: 1,
          tension: 0.4,
          fill: false
        },
        {
          label: 'Расходы',
          data: [
            {x: new Date('2023-01-10'), y: 28},
            {x: new Date('2023-01-30'), y: 48},
            {x: new Date('2023-02-01'), y: 40},
            {x: new Date('2023-03-15'), y: 19},
            {x: new Date('2023-04-16'), y: 86},
            {x: new Date('2023-05-01'), y: 27},
            {x: new Date('2023-05-20'), y: 90},
          ],
          backgroundColor: '#ec4899',
          borderColor: '#ec4899',
          borderWidth: 1,
          tension: 0.4,
          fill: false
        }
      ],
      options: {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: "#334155"
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#64748b"
            },
            grid: {
              color: "#e2e8f0",
              drawBorder: false
            },
            type: "time",
          },
          y: {
            ticks: {
              color: "#64748b"
            },
            grid: {
              color: "#e2e8f0",
              drawBorder: false
            },
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    };

    this.popularCityData = {
      labels: ['Склад 1', 'Склад 2', 'Склад 3', 'Склад 4', 'Склад 5', 'Склад 4', 'Склад 5'],
      datasets: [
        {
          label: 'Загруженность',
          data: [56, 32, 24, 19, 15, 150, 200],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ],
      options: {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: "#334155"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "#64748b"
            },
            grid: {
              color: "#e2e8f0",
              drawBorder: false
            }
          },
          x: {
            ticks: {
              color: "#64748b"
            },
            grid: {
              color: "#e2e8f0",
              drawBorder: false
            }
          }
        }
      }
    };
  }
}
