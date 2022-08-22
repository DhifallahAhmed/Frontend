import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeesComponent } from './employees/employees.component';
import { UserAddComponent } from './user-add/user-add.component';
import { HoursComponent } from './hours/hours.component';
import { HeureAddComponent } from './heure-add/heure-add.component';
import { HeureEditComponent } from './heure-edit/heure-edit.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
const routes:Routes = [
{
  path: '', component:HomeComponent,
  canActivate: [AuthGuard]
},
{
  path: 'register', component:RegisterComponent
},
{
  path: 'login', component:LoginComponent
},
{
  path: 'dashboard', component:DashboardComponent,
  canActivate: [AuthGuard]
},
{path : 'dashboard/employes/edit/:id',component:UserEditComponent},
{path : 'dashboard/add',component:UserAddComponent},
{path : 'dashboard/calendrier',component:CalendarComponent},
{path : 'home/calendrier',component:CalendarComponent},
{path : 'dashboard/employes',component:EmployeesComponent},
{path : 'dashboard/addHeure',component:HeureAddComponent},
{path : 'dashboard/heure/editHeure/:id',component:HeureEditComponent},
{path : 'dashboard/heure',component:HoursComponent}


];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    UserEditComponent,
    CalendarComponent,
    NavbarComponent,
    EmployeesComponent,
    UserAddComponent,
    HoursComponent,
    HeureAddComponent,
    HeureEditComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    NgbModalModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  exports: [CalendarComponent],
  providers: [AuthGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
