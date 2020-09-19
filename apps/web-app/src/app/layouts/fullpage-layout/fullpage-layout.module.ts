import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './../../pages/dashboard/dashboard.component';
import { FullPageLayoutRoutes } from './fullpage-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FullPageLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [DashboardComponent],
})
export class FullPageLayoutModule {}
