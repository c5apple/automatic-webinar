import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'env/environment';
import { WebinarListComponent } from './webinar-list.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  declarations: [WebinarListComponent],
  providers: [
    environment.webinarService
  ]
})
export class WebinarListModule { }
