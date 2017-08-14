import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebinarComponent } from './webinar.component';
import { WebinarListComponent } from './webinar-list/webinar-list.component';

const routes: Routes = [
  {
    path: '', component: WebinarComponent,
    children: [
      { path: 'list', component: WebinarListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WebinarRoutingModule { }
