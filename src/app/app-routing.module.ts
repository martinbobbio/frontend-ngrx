import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from './guards/auth.guard';

import { dashboardRoutes } from './components/dashboard/dashboard.routes';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes:Routes = [
    { path: 'login', component:LoginComponent },
    { path: 'register', component:RegisterComponent },
    { path: '', component:DashboardComponent, children:dashboardRoutes, canActivate:[AuthGuard] },
    { path: '**', redirectTo:'' } 
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class AppRoutingModule{

}