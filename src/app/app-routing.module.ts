import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeViewComponent } from './home-view/home-view.component';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeViewComponent},
  {path: 'login', component: LoginComponent},
  {path: 'callback', component: CallbackComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
