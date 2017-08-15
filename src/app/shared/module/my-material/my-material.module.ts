import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import {
  MdCardModule,
  MdIconModule,
  MdPaginatorModule,
  MdTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CdkTableModule,
    MdCardModule,
    MdIconModule,
    MdPaginatorModule,
    MdTableModule
  ],
  exports: [
    CdkTableModule,
    MdCardModule,
    MdIconModule,
    MdPaginatorModule,
    MdTableModule
  ],
  declarations: []
})
export class MyMaterialModule { }
