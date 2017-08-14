import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'env/environment';
import { WebinarListComponent } from './webinar-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WebinarListComponent],
  providers: [
    environment.webinarService
  ]
})
export class WebinarListModule { }
