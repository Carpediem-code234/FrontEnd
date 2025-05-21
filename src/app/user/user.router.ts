import { Routes } from '@angular/router';
import { UserHomeComponent } from './user-home/user-home.component';
import { SearchComponent } from './search/search.component';
import { BarberiaDetailComponent } from './barberia-detail/barberia-detail.component';
import { BookingComponent } from './booking/booking.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';

export const userRoutes: Routes = [
  {
    path: '', component: UserLayoutComponent, children: [
      { path: '', component: UserHomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'barberia/:id', component: BarberiaDetailComponent },
      { path: 'booking/:id', component: BookingComponent },
      { path: 'reservations', component: ReservationsComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];
