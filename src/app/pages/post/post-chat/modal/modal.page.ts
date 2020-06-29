import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioMensaje, ListaUsuario } from '../../../../interfaces/interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() usuariosConectados: ListaUsuario[];

  public uConectados: ListaUsuario[] = [];
  public nombreUsuario: string;


  constructor( private modalController: ModalController) { }

  ngOnInit() {
    this.darValor();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  darValor() {

    //this.nombreUsuario = this.usuariosConectados[0].nombre;
    /* for (const usuarios of this.usuariosConectados) {
      this.uConectados.nombre = this
    } */
    console.log('usuariosConectaos', this.usuariosConectados);
  }


}
