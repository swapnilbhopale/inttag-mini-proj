import { Routes } from '@angular/router';
import { Login } from './preAuth/login/login';
import { Register } from './preAuth/register/register';
import { Dashboard } from './postAuth/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';
import { CreateEmp } from './postAuth/create-emp/create-emp';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'create-emp', component: CreateEmp, canActivate: [authGuard] },
];
