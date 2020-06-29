import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Usuario, Post, UsuarioMensaje } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PostsService } from 'src/app/services/posts.service';
import { PostComponent } from 'src/app/components/post/post.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { ListaUsuario } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, OnDestroy {
  private destroy$ = new Subject <boolean>();

  usuario: Usuario;
  postId: string;
  personas: ListaUsuario[];
  public mensaje: string;
  public usuarioMensajes: UsuarioMensaje[] = [];
  public isAdministrator = false;
  public mensajeAdministrador: string;

  public usuariosSala: Usuario[] = [];

  constructor(  private usuarioService: UsuarioService,
                private socket: Socket,
                private route: ActivatedRoute,
                private uiService: UiServiceService,
                private modalController: ModalController) { }

  ngOnInit() {
      this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
        this.postId = params.id;
        this.handleSocketConnection();
      });
  }

  async listaUsuariosConectados() {

    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        usuariosConectados: this.personas
      }
    });

    await modal.present();
  }

  private addUserMessage( usuarioMensaje: UsuarioMensaje ) {
    this.usuarioMensajes.push( usuarioMensaje );
  }

  giveValueToMessage( fMensaje: NgForm) {

    if (fMensaje.invalid ) { return; }

    const usuarioMensaje = {
      nombreUsuario: this.usuario.nombre,
      mensaje: this.mensaje,
      sala: this.postId
    };
    this.socket.emit('crearMensaje', usuarioMensaje);
    this.isAdministrator = false;
    console.log('isAdministrador', this.isAdministrator);
    console.log('usuarioMensaje', this.usuarioMensajes);
    this.addUserMessage(usuarioMensaje);
    this.mensaje = '';
  }

  private handleSocketConnection(){
    console.log('Conectado al servidor!!!!!!!!!!!!!!!!!!!!!!!!!');

    this.usuario = this.usuarioService.getUsuario();

    const usuarioSala = {
      nombre: this.usuario.nombre,
      sala: this.postId
    };

    // escuchar
    this.socket.on('disconnect', () => {

      console.log('Perdimos conexión con el servidor');

    });

    // Escuchar información
    this.socket.on('crearMensaje', (usuarioMensaje) => {
      /* renderizarMensajes(mensaje, false); */
      console.log('mensaje', usuarioMensaje);
      console.log('usuarioMensaje', this.usuarioMensajes);
      if ( usuarioMensaje.nombre === 'Administrador') {
        /* this.isAdministrator = true;
        this.mensajeAdministrador = usuarioMensaje.mensaje; */
        this.uiService.presentToast( usuarioMensaje.mensaje );
      }else {
        this.isAdministrator = false;
        this.addUserMessage({
          nombreUsuario: usuarioMensaje.nombre,
          mensaje: usuarioMensaje.mensaje,
          sala: this.postId
        });
      }
    });

    // Escuchar cambios de usuarios
    // cuando un usuario entra o sale del chat
    this.socket.on('listaPersona', (data) => {

      console.log('usuarios en sala', data);
      this.personas = data;

    });

    this.socket.emit('entrarChat', usuarioSala);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.socket.removeAllListeners();
    const usuarioSala = { nombre: this.usuario.nombre, sala: this.postId };
    this.socket.emit('salirChat', usuarioSala);
    // this.socket.disconnect();
    // escuchar
    this.socket.on('disconnect', () => {

      console.log('Perdimos conexión con el servidor');

    });
  }

}


