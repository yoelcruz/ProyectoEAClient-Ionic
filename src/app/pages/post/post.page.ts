import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Usuario, Post } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PostsService } from 'src/app/services/posts.service';
import { PostComponent } from 'src/app/components/post/post.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit, OnDestroy {
  private destroy$ = new Subject <boolean>();

  usuario: Usuario = {};
  postId: string;

  public usuariosSala: Usuario[] = [];

  constructor(  private usuarioService: UsuarioService,
                private socket: Socket,
                private route: ActivatedRoute) { }

  ngOnInit() {
      //this.socket.connect();
      console.log('ngOnInit****************');
      this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
        console.log('params', params);
        this.postId = params.id;
        this.handleSocketConnection();
      });
  }

  private handleSocketConnection(){
    console.log('Conectado al servidor!!!!!!!!!!!!!!!!!!!!!!!!!');

    this.usuario = this.usuarioService.getUsuario();
    console.log('nombre', this.usuario.nombre);

    const usuarioSala = { nombre: this.usuario.nombre, sala: this.postId };

    this.socket.emit('entrarChat', usuarioSala);
      /*  renderizarUsuarios(resp); */
    console.log('emit realizado');

    /* this.socket.on('listaPersonas', (data) => {
      console.log('Listapersonas', data);
      this.usuariosSala = data;
    }); */


    // escuchar
    this.socket.on('disconnect', () => {

      console.log('Perdimos conexión con el servidor');

    });

    // Escuchar información
    this.socket.on('crearMensaje', (mensaje) => {
      /* renderizarMensajes(mensaje, false); */
      console.log('mensaje', mensaje);
    });

    // Escuchar cambios de usuarios
    // cuando un usuario entra o sale del chat
    this.socket.on('listaPersona', (personas) => {
      /* renderizarUsuarios(personas); */
      console.log('personas', personas);
    });

    // Mensajes privados
    this.socket.on('mensajePrivado', (mensaje) => {

      console.log('Mensaje Privado:', mensaje);

    });
  }

  ngOnDestroy() {
    console.log('Ondestroy!!!!!!!!!!!!!!!!!!!!!!!!!!');
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.socket.removeAllListeners();
    const usuarioSala = { nombre: this.usuario.nombre, sala: this.postId };
    this.socket.emit('salirChat', usuarioSala);
  }



}

/* var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
  window.location = 'index.html';
  throw new Error('El nombre y sala son necesarios');
}

var usuario = {
  nombre: params.get('nombre'),
  sala: params.get('sala')
}; */


