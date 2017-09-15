import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdPaginatorModule,
  MdSnackBarModule,
  MdProgressSpinnerModule,
  MdTableModule,
  MdToolbarModule
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
    MdMenuModule,
    MdPaginatorModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    MdTableModule,
    MdToolbarModule
  ],
  exports: [
    CdkTableModule,
    MdButtonModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdPaginatorModule,
    MdSnackBarModule,
    MdProgressSpinnerModule,
    MdTableModule,
    MdToolbarModule
  ],
  declarations: []
})
export class MyMaterialModule { }
