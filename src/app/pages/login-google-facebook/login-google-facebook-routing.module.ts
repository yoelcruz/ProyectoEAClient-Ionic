import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGoogleFacebookPage } from './login-google-facebook.page';

const routes: Routes = [
  {
    path: '',
    component: LoginGoogleFacebookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginGoogleFacebookPageRoutingModule {}
