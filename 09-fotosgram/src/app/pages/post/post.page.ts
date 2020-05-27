import { Component, OnInit } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  constructor(private socket: Socket) { }

  ngOnInit() {
    //this.socket.connect();


      console.log('Conectado al servidor');

      const usuario = { nombre: 'Yoel', sala: 'chat' };
      this.socket.emit('entrarChat', usuario);
       /*  renderizarUsuarios(resp); */
      console.log('emit realizado');



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


