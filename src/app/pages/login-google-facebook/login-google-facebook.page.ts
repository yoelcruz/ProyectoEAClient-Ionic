import { Component, OnInit } from '@angular/core';

import { UsuarioService, LoginProvider } from '../../services/usuario.service';

@Component({
  selector: 'app-login-google-facebook',
  templateUrl: './login-google-facebook.page.html',
  styleUrls: ['./login-google-facebook.page.scss'],
})
export class LoginGoogleFacebookPage  {

  constructor( public usuarioService: UsuarioService ) { }

  ingresar( proveedor: LoginProvider ) {
    console.log( proveedor );

    this.usuarioService.loginFireBase( proveedor );
  }

}
