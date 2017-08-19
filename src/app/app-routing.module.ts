import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },  // TODO LoginComponentに差し替え
  // { path: 'login', component: LoginComponent },
  // { path: 'logout', component: LogoutComponent },
  { path: 'a', loadChildren: './admin/admin.module#AdminModule' },  // TODO guard
  // { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
