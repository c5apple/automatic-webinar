import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdPaginatorModule,
  MdSnackBarModule,
  MdTableModule
} from '@angular/material';

@NgModule({
  imports: [
    CdkTableModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdPaginatorModule,
    MdSnackBarModule,
    MdTableModule
  ],
  exports: [
    CdkTableModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdPaginatorModule,
    MdSnackBarModule,
    MdTableModule
  ],
  declarations: []
})
export class MyMaterialModule { }
