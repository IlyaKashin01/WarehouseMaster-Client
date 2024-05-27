import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    { path: "", component: SigninComponent }, // Дефолтный маршрут
    { path: "layout", component: LayoutComponent }, // Исправленный маршрут
    { path: "signup", component: SignupComponent },
    { path: "**", redirectTo: "" } // Должен быть последним
];
