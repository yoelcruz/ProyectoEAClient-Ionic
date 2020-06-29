import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostPage } from './post-chat/post.page';
import { PostUsersPage } from './post-users/post-users.page';

const routes: Routes = [
  {
    path: ':id',
    component: PostPage
  },
  {
    path: ':id/users',
    component: PostUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}
