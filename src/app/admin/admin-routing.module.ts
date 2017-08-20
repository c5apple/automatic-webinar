import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AccountComponent } from './account/account.component';
import { WebinarListComponent } from './webinar/webinar-list/webinar-list.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'account', component: AccountComponent },
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
