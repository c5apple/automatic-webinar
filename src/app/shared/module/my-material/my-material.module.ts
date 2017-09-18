import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MdButtonModule,
  MdCardModule,
  MdCheckboxModule,
  MdDialogModule,
  MdDatepickerModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdSnackBarModule,
  MdSelectModule,
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
    MdDatepickerModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdSnackBarModule,
    MdSelectModule,
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
    MdDatepickerModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdSnackBarModule,
    MdSelectModule,
    MdProgressSpinnerModule,
    MdTableModule,
    MdToolbarModule
  ],
  declarations: []
})
export class MyMaterialModule { }
