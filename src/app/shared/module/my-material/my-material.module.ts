import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import {
  MdCardModule,
  MdIconModule,
  MdTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CdkTableModule,
    MdCardModule,
    MdIconModule,
    MdTableModule
  ],
  exports: [
    CdkTableModule,
    MdCardModule,
    MdIconModule,
    MdTableModule
  ],
  declarations: []
})
export class MyMaterialModule { }
