import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'env/environment';
import { LoginComponent } from './login.component';
import { MyMaterialModule } from 'shared/module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    environment.authService
  ]
})
export class LoginModule { }
