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
    children: [
      { path: 'account', component: AccountInputComponent },
      { path: 'password', component: AccountPasswordComponent },
      { path: 'opt/list', component: OptListComponent },
      { path: 'webinar/list', component: WebinarListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
