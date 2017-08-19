import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebinarInputModule } from './webinar-input/webinar-input.module';
import { WebinarListModule } from './webinar-list/webinar-list.module';

@NgModule({
  imports: [
    CommonModule,
    WebinarInputModule,
    WebinarListModule
  ],
  declarations: []
})
export class WebinarModule { }
