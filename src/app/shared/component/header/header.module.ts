import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { AppRoutingModule } from '../../../app-routing.module';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    MyMaterialModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
