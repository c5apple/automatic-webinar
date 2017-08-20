import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AccountModule } from './account/account.module';
import { WebinarModule } from './webinar/webinar.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AccountModule,
    WebinarModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule { }
