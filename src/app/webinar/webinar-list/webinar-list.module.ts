import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebinarListComponent } from './webinar-list.component';
import { WebinarService, WebinarMockService } from 'shared/service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WebinarListComponent],
  providers: [
    { provide: WebinarService, useClass: WebinarMockService }
  ]
})
export class WebinarListModule { }
