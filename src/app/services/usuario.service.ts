import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

//Google
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

const URL = environment.url;

export type LoginProvider = 'google' | 'facebook';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  public usuarioGoogle: any = {};

  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController,
               public afAuth: AngularFireAuth ) {

    this.afAuth.authState.subscribe( user => {

      console.log( 'Estado del usuario: ', user );

      this.usuarioGoogle.nombre = user.displayName;
      this.usuarioGoogle.uid = user.uid;
      this.usuarioGoogle.email = user.email;
      this.usuarioGoogle.foto = user.photoURL; //¿?¿??¿?¿

    });
  }

  loginFireBase( proveedor: LoginProvider ) {
    const loginMapProvider: { [ key in LoginProvider ]: firebase.auth.AuthProvider } = {
      facebook: new firebase.auth.FacebookAuthProvider(),
      google: new firebase.auth.GoogleAuthProvider()
    };

    this.afAuth.auth.signInWithPopup( loginMapProvider[proveedor] );
  }
  logoutGoogle() {
    this.afAuth.auth.signOut();
  }

  login( email: string, password: string ) {

    const data = { email, password };

    return new Promise( resolve => {

        this.http.post(`${ URL }/user/login`, data).subscribe(  async resp => {
            console.log(resp);

            if ( resp['ok'] ) {
              await this.guardarToken( resp['token'] );
              resolve(true);
            } else {
              this.token = null;
              this.storage.clear();
              resolve(false);
            }
        });
    });
  }

  logout() {
    this.token   = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  registro( usuario: Usuario ) {
      return new Promise( resolve => {
          this.http.post(`${ URL }/user/create`, usuario).subscribe( async resp => {
              console.log(resp);

              if ( resp['ok'] ) {
                await this.guardarToken( resp['token'] );
                resolve(true);
              } else {
                this.token = null;
                this.storage.clear();
                resolve(false);
              }
          });
      });
  }

  getUsuario() {

    if ( !this.usuario._id ) {
      this.validaToken();
    }
    return { ...this.usuario };

  }

  async guardarToken( token: string ) {

    this.token = token;
    await this.storage.set('token', token );

    await this.validaToken();
  }

  async cargarToken() {

    this.token = await this.storage.get('token') || null;

  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL }/user/`, { headers })
        .subscribe( resp => {

          if ( resp['ok'] ) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  actualizarUsuario( usuario: Usuario ) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {
      this.http.post(`${ URL }/user/update`, usuario, { headers })
      .subscribe( resp => {

        if ( resp['ok'] ) {
          this.guardarToken( resp['token'] );
          resolve(true);
        } else {
          resolve(false);
        }

      });
    });
  }

}
