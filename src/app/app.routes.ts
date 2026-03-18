import { Routes } from '@angular/router';
import { Login } from './preAuth/login/login';
import { Register } from './preAuth/register/register';
import { Dashboard } from './postAuth/dashboard/dashboard';

export const routes: Routes = [
    {path:'login', component:Login},
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'register', component:Register},
    {path:'dashboard', component:Dashboard}

];
