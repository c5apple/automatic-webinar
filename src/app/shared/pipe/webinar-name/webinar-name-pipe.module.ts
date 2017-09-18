import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'env/environment';
import { WebinarNamePipe } from './webinar-name.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WebinarNamePipe
  ],
  exports: [
    WebinarNamePipe
  ],
  providers: [
    environment.webinarService
  ]
})
export class WebinarNamePipeModule { }
