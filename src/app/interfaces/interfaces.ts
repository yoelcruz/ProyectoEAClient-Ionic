
export interface RespuestaPosts {
  ok: boolean;
  pagina: number;
  posts: Post[];
}
export interface RespuestaPost {
  ok: boolean;
  post: Post;
}

export interface Post {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
  usuarios?: string[];
}

export interface Usuario {
  avatar?: string;
  _id?: string;
  nombre?: string;
  email?: string;
  password?: string;
  firebase?: string;
}

export interface ListaUsuario {
  id: string;
  nombre: string;
  sala: string;
}

export interface UsuarioMensaje {
  nombreUsuario: string;
  mensaje: string;
  sala: string;
}

export interface RespuestaAñadirUsuarioPost {
  ok: boolean;
  post: PostConUsuarios;
}

export interface PostConUsuarios {
  imgs?: string[];
  _id?: string;
  mensaje?: string;
  coords?: string;
  usuario?: Usuario;
  created?: string;
  usuarios?: Usuario[];
}
