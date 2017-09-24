import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './page-not-found.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    MyMaterialModule
  ],
  declarations: [PageNotFoundComponent]
})
export class PageNotFoundModule { }
