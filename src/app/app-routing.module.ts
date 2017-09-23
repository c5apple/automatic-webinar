import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'shared/service';

const routes: Routes = [
  { path: '', component: LoginComponent, data: { title: 'ログイン' } },
  // { path: 'login', component: LoginComponent },
  // { path: 'logout', component: LogoutComponent },
  { path: 'a', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] },
  // { path: '**', component: PageNotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
