import { Component, OnInit, Input } from '@angular/core';
import { Post, Usuario } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};
  public numUserInPost: number;
  public alreadyAdded = false;

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor(
    private postService: PostsService,
    private userService: UsuarioService,
    private uiService: UiServiceService
  ) { }

  ngOnInit() {
    this.updateCounter(this.post);
  }

  alertainformativa(){
    this.uiService.alertaInformativa('Si no te has añadido a esta experiencia no puedes acceder a su chat');
  }

  updateCounter(post: Post){
    const user = this.userService.getUsuario();
    this.numUserInPost = post.usuarios.length;
    this.alreadyAdded = post.usuarios.includes(user._id);
  }

  addUserToPost(){
    this.postService.addUser(this.post).subscribe((resp) => {
      this.updateCounter(resp.post);
    });
  }

  deleteUserToPost(){
    this.postService.deleteUser(this.post).subscribe((resp) => {
      this.updateCounter(resp.post);
    });
  }

  getUserToPost(){
    this.postService.getPost(this.post._id).subscribe((resp) => {
      console.log('getUserToPost', resp.post.usuarios);
    });
  }

  getIdPost(){
    console.log('postId', this.post._id);
    return this.post._id;
  }

}
