import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { WebinarListComponent } from './webinar-list.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule
  ],
  declarations: [WebinarListComponent],
  providers: [
    environment.webinarService
  ]
})
export class WebinarListModule { }
