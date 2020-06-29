import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostPageRoutingModule } from './post-routing.module';

import { PostPage } from './post-chat/post.page';
import { PostUsersPage } from './post-users/post-users.page';
import { ModalPage } from './post-chat/modal/modal.page';


/* import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PostUsersPage } from './post-users/post-users.page';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} }; */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostPageRoutingModule
    /* SocketIoModule.forRoot(config) */
  ],
  declarations: [
    PostPage,
    PostUsersPage,
    ModalPage
  ]
})
export class PostPageModule {}
