import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './services/auth.guard.service';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
]
