import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { AccountPasswordComponent } from './account-password.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [
    AccountPasswordComponent
  ],
  providers: [
    environment.accountService
  ]
})
export class AccountPasswordModule { }
