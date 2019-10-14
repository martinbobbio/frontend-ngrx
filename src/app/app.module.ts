import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

//Routing
import { AppRoutingModule } from './app-routing.module';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//NGRX
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer'

//Graphics
import { ChartsModule } from 'ng2-charts'

//Pipes
import { FirstUppercasePipe } from './pipes/first-uppercase.pipe';
import { OrderEgressIncomePipe } from './pipes/order-egress-income.pipe';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EgressIncomeComponent } from './components/egress-income/egress-income.component';
import { StatsComponent } from './components/stats/stats.component';
import { DetailsComponent } from './components/details/details.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EgressIncomeComponent,
    StatsComponent,
    DetailsComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    FirstUppercasePipe,
    OrderEgressIncomePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
