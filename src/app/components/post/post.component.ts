import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};

  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  constructor(
    public postService: PostsService
  ) { }

  ngOnInit() {}

  addUserToPost(){
    this.postService.addUser(this.post).subscribe((resp) => {
      console.log(resp);
    });
  }
  getUserToPost(){
    this.postService.getPost(this.post._id).subscribe((resp) => {
      console.log('get', resp.post.usuarios);
    });
  }

}
