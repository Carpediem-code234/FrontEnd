import { Routes } from '@angular/router';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarberiaManagementComponent } from './barberia-management/barberia-management.component';
import { ServicesManagementComponent } from './services-management/services-management.component';
import { StylistsManagementComponent } from './stylists-management/stylists-management.component';
import { ReservationsAdminComponent } from './reservations-admin/reservations-admin.component';
import { ReportsComponent } from './reports/reports.component';

export const adminRoutes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'barberias', component: BarberiaManagementComponent },
      { path: 'servicios', component: ServicesManagementComponent },
      { path: 'estilistas', component: StylistsManagementComponent },
      { path: 'reservas', component: ReservationsAdminComponent },
      { path: 'reports', component: ReportsComponent },
    ],
  },
];
