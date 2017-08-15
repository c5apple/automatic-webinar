import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import {
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdPaginatorModule,
  MdTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CdkTableModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdPaginatorModule,
    MdTableModule
  ],
  exports: [
    CdkTableModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdPaginatorModule,
    MdTableModule
  ],
  declarations: []
})
export class MyMaterialModule { }
