import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MyMaterialModule } from 'shared/module';
import { AccountModule } from './account/account.module';
import { OptModule } from './opt/opt.module';
import { WebinarModule } from './webinar/webinar.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MyMaterialModule,
    AccountModule,
    OptModule,
    WebinarModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule { }
