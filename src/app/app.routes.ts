import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CustomersComponent} from "./customers/customers.component";
import { WarehousesComponent } from './warehouses/warehouses.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { SettingsComponent } from './settings/settings.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { DialogsComponent } from './dialogs/dialogs.component';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
    { path: "", component: SigninComponent }, 
    { path: "layout", component: LayoutComponent, children : [
        { path: "dashboard", component: DashboardComponent },
        { path: "customers", component: CustomersComponent },
        { path: "warehouses", component: WarehousesComponent},
        { path: "details", component: WarehouseDetailsComponent },
        { path: "settings", component: SettingsComponent },
        { path: "supplers", component: SuppliersComponent },
        { path: "dialogs", component: DialogsComponent, children: [
            { path: 'chat', component: ChatComponent },
            { path: 'group', component: GroupComponent }
          ] },
    ] }, 
    { path: "signup", component: SignupComponent },
    { path: "reset-pass", component: ResetPasswordComponent },
    { path: "change-pass", component: ChangePasswordComponent },
    { path: "**", redirectTo: "" } 
];
