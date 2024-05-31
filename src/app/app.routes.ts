import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CustomersComponent} from "./customers/customers.component";

export const routes: Routes = [
    { path: "", component: SigninComponent }, // Дефолтный маршрут
    { path: "layout", component: LayoutComponent, children : [
        { path: "dashboard", component: DashboardComponent },
        { path: "customers", component: CustomersComponent },
    ] }, // Исправленный маршрут
    { path: "signup", component: SignupComponent },
    { path: "**", redirectTo: "" } // Должен быть последним
];
