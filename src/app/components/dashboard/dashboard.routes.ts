import { Routes } from "@angular/router";
import { EgressIncomeComponent } from '../egress-income/egress-income.component';
import { DetailsComponent } from '../details/details.component';
import { StatsComponent } from '../stats/stats.component';


export const dashboardRoutes:Routes = [
    { path: '', component:StatsComponent },
    { path: 'egress-income', component:EgressIncomeComponent },
    { path: 'details', component:DetailsComponent },
]
