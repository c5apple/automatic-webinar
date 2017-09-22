import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AccountInputComponent } from './account/account-input/account-input.component';
import { AccountPasswordComponent } from './account/account-password/account-password.component';
import { OptListComponent } from './opt/opt-list/opt-list.component';
import { WebinarListComponent } from './webinar/webinar-list/webinar-list.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    data: { title: '' },
    children: [
      { path: 'account', component: AccountInputComponent, data: { title: 'アカウント変更' } },
      { path: 'password', component: AccountPasswordComponent, data: { title: 'パスワード変更' } },
      { path: 'opt/list', component: OptListComponent, data: { title: 'オプト一覧' } },
      { path: 'webinar/list', component: WebinarListComponent, data: { title: 'ウェビナー一覧' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
