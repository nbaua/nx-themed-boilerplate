import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FullPageLayoutComponent } from './layouts/fullpage-layout/fullpage-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/admin-layout/admin-layout.module').then(
            (mod) => mod.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: '',
    component: FullPageLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layouts/fullpage-layout/fullpage-layout.module').then(
            (mod) => mod.FullPageLayoutModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
