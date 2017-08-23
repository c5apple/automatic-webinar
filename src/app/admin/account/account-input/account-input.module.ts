import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { AccountInputComponent } from './account-input.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [
    AccountInputComponent
  ],
  providers: [
    environment.accountService
  ]
})
export class AccountInputModule { }
