import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private ruta:string =environment.apiGeneral;
  constructor(private HttpClient:HttpClient) { }
  login(email, password){
    return this.HttpClient.get(this.ruta + '/login/' + email + '/' + password);
  }

  store(usuario:User){
    return this.HttpClient.post(this.ruta + '/usuario', usuario);
  }

  update(usuario:User, id){
    return this.HttpClient.put(this.ruta + '/usuario/' + id, usuario);
  }

  passwordUpdate(password, id, currentPassword){
    return this.HttpClient.put(this.ruta + '/passwordUpdate/' + id + '/' + currentPassword, password);
  }

  /*passwordUpdate(password, id){
    return this.HttpClient.post(this.ruta + '/passwordUpdate/' + id, password);
  }*/
}
