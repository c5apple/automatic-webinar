import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { MyMaterialModule } from 'shared/module';
import { AccountInputModule } from './account-input/account-input.module';
import { AccountPasswordModule } from './account-password/account-password.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    AccountInputModule,
    AccountPasswordModule
  ],
  providers: [
    environment.accountService
  ]
})
export class AccountModule { }
