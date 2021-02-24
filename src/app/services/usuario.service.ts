import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private ruta:string =environment.apiGeneral;
  constructor(private HttpClient:HttpClient) { }
  login(email, password){
    return this.HttpClient.get(this.ruta + '/login/' + email + '/' + password);
  }

  store(usuario:Usuario){
    return this.HttpClient.post(this.ruta + '/usuario', usuario);
  }

  passwordUpdate(password, id){
    return this.HttpClient.put(this.ruta + '/passwordUpdate/' + id, password);
  }

  /*passwordUpdate(password, id){
    return this.HttpClient.post(this.ruta + '/passwordUpdate/' + id, password);
  }*/
}
