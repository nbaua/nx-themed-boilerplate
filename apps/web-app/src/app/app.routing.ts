import { Routes } from '@angular/router';
import { FullPageLayoutComponent } from './layouts/fullpage-layout/fullpage-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
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
