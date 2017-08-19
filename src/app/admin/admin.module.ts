import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { WebinarModule } from './webinar/webinar.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    WebinarModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule { }
