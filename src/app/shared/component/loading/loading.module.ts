import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './loading.component';
import { MyMaterialModule } from 'shared/module';
import { LoadingService } from 'shared/service';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ],
  providers: [
    LoadingService
  ]
})
export class LoadingModule { }
