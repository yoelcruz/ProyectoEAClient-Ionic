import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService, LoginProvider } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    email: 'yoel@yoel.com',
    password: '1234'
  };

  registerUser: Usuario = {
    email: 'test',
    password: '1234',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor( private usuarioService: UsuarioService,
               private navCtrl: NavController,
               private uiService: UiServiceService) { }

  ngOnInit() {

    /* this.slides.lockSwipes( true ); */
  }

  async ingresar( proveedor: LoginProvider ) {
    console.log( 'ingresar', proveedor );

    const credential = await this.usuarioService.loginFireBase( proveedor );
    const user = credential.user;
    //console.log('user ingresar', user);
    const valido = await this.usuarioService.generateTokenForFirebase( user.email );
    //console.log('valido ingresar', valido);
    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    }else {
      this.uiService.alertaInformativa('No estás registrado con este correo. Regrístate antes, para poder entrar');
    }

  }

  async firebaseRegister( provider: LoginProvider ) {
    const {user: firebaseUser} = await this.usuarioService.loginFireBase( provider );

    const user: Usuario = {
      nombre: firebaseUser.displayName,
      email: firebaseUser.email,
      avatar: firebaseUser.photoURL,
      firebase: provider,
      password: '1234'
    };

    const valido = await this.usuarioService.registro ( user );

    if (valido) {
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    }else {
      this.uiService.alertaInformativa('Ya se han registrado con este correo electrónico.');
    }
  }

  async login( fLogin: NgForm ) {

    if ( fLogin.invalid ) { return ; }

    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos.');
    }

  }

  async registro( fRegistro: NgForm ) {

    if ( fRegistro.invalid ) { return; }

    const valido = await this.usuarioService.registro ( this.registerUser );

    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electrónico ya existe.');
    }

  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

}
