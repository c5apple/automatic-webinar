import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebinarComponent } from './webinar.component';
import { WebinarRoutingModule } from './webinar-routing.module';
import { WebinarListModule } from './webinar-list/webinar-list.module';

@NgModule({
  imports: [
    CommonModule,
    WebinarRoutingModule,
    WebinarListModule
  ],
  declarations: [WebinarComponent]
})
export class WebinarModule { }
