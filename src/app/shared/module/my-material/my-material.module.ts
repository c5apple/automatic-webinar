import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import {
  MdCardModule,
  MdCheckboxModule,
  MdIconModule,
  MdInputModule,
  MdPaginatorModule,
  MdTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CdkTableModule,
    MdCardModule,
    MdCheckboxModule,
    MdIconModule,
    MdInputModule,
    MdPaginatorModule,
    MdTableModule
  ],
  exports: [
    CdkTableModule,
    MdCardModule,
    MdCheckboxModule,
    MdIconModule,
    MdInputModule,
    MdPaginatorModule,
    MdTableModule
  ],
  declarations: []
})
export class MyMaterialModule { }
