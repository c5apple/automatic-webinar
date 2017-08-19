import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { WebinarInputComponent } from './webinar-input.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [
    WebinarInputComponent
  ],
  entryComponents: [
    WebinarInputComponent
  ],
  providers: [
    environment.webinarService
  ]
})
export class WebinarInputModule { }
