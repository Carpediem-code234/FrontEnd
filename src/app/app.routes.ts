import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { BarberiaDetailComponent } from './barberia-detail/barberia-detail.component';
import { BookingComponent } from './booking/booking.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarberiaManagementComponent } from './barberia-management/barberia-management.component';
import { ServicesManagementComponent } from './services-management/services-management.component';
import { StylistsManagementComponent } from './stylists-management/stylists-management.component';
import { ReservationsAdminComponent } from './reservations-admin/reservations-admin.component';
import { ReportsComponent } from './reports/reports.component';
import {LoginRegistroComponent} from './user-acces/login-registro.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent },
  { path: 'login', component: LoginRegistroComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'barberia/:id', component: BarberiaDetailComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/barberias', component: BarberiaManagementComponent },
  { path: 'admin/servicios', component: ServicesManagementComponent },
  { path: 'admin/estilistas', component: StylistsManagementComponent },
  { path: 'admin/reservas', component: ReservationsAdminComponent },
  { path: 'admin/reports', component: ReportsComponent },
];
