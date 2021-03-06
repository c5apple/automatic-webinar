import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { OptListComponent } from './opt-list.component';
import { MyMaterialModule } from 'shared/module';
import { ConfirmDialogModule } from 'shared/component';
import { WebinarNamePipeModule } from 'shared/pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ConfirmDialogModule,
    WebinarNamePipeModule
  ],
  declarations: [
    OptListComponent
  ],
  providers: [
    environment.optService
  ]
})
export class OptListModule { }
