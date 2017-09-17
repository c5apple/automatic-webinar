import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { OptInputComponent } from './opt-input.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [
    OptInputComponent
  ],
  entryComponents: [
    OptInputComponent
  ],
  providers: [
    environment.optService,
    environment.webinarService
  ]
})
export class OptInputModule { }
