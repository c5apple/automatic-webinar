import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OptInputModule } from './opt-input/opt-input.module';
import { OptListModule } from './opt-list/opt-list.module';

@NgModule({
  imports: [
    CommonModule,
    OptInputModule,
    OptListModule
  ],
  declarations: []
})
export class OptModule { }
