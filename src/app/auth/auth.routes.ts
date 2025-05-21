import { Routes } from '@angular/router';
import { LoginRegistroComponent } from './login-registro/login-registro.component';
//import { AuthGuard } from './auth/auth.guard';

export const authRoutes: Routes = [
  { path: 'login', component: LoginRegistroComponent }
];