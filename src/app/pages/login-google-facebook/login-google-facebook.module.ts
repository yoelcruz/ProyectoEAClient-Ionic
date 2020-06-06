import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginGoogleFacebookPageRoutingModule } from './login-google-facebook-routing.module';

import { LoginGoogleFacebookPage } from './login-google-facebook.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginGoogleFacebookPageRoutingModule
  ],
  declarations: [LoginGoogleFacebookPage]
})
export class LoginGoogleFacebookPageModule {}
