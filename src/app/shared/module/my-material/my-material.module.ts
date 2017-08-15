import { NgModule } from '@angular/core';
import {
  MdCardModule,
  MdIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MdCardModule,
    MdIconModule
  ],
  exports: [
    MdCardModule,
    MdIconModule
  ],
  declarations: []
})
export class MyMaterialModule { }
