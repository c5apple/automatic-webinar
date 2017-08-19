import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteDialogComponent } from './complete-dialog.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  declarations: [
    CompleteDialogComponent
  ],
  exports: [
    CompleteDialogComponent
  ],
  entryComponents: [
    CompleteDialogComponent
  ]
})
export class CompleteDialogModule { }
