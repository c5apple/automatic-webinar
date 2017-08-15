import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { WebinarListComponent } from './webinar-list.component';
import { MyMaterialModule } from 'shared/module';
import { ConfirmDialogModule } from 'shared/component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialModule,
    ConfirmDialogModule
  ],
  declarations: [WebinarListComponent],
  providers: [
    environment.webinarService
  ]
})
export class WebinarListModule { }
