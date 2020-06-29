import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostsService } from 'src/app/services/posts.service';
import { Usuario } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-post-users',
  templateUrl: './post-users.page.html',
  styleUrls: ['./post-users.page.scss'],
})
export class PostUsersPage implements OnInit, OnDestroy {
  private destroy$ = new Subject <boolean>();

  postId: string;
  usuarios: Usuario[];
  usuarioUsuario: Usuario[];
  iterator: any;

  constructor(  private route: ActivatedRoute,
                private postService: PostsService ) { }

  ngOnInit() {
      this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
        console.log('params', params);
        this.postId = params.id;
      });
      this.getUserToPost();
  }

  getUserToPost(){
    this.postService.getPost(this.postId).subscribe((resp) => {
      console.log('getUserToPost', resp.post.usuarios);
      this.usuarios = resp.post.usuarios;


      /* for ( const usuario of usuariosString ) {
        this.usuarios.push(usuario);
      } */

      /* for (let i: number; i < usuariosString.length; i++){
        this.usuarios[0] = usuariosString[0];
        //this.usuarios.push(usuariosString[1]);
      } */
      /* console.log('this.usuarios', this.usuarios); */
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}


