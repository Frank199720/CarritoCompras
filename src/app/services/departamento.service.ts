import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../interfaces/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private ruta:string =environment.apiGeneral;
  constructor(private HttpClient:HttpClient) { }

  index(){
    return this.HttpClient.get(this.ruta + '/indexdep');
  }

  store(departamento:Departamento){
    return this.HttpClient.post(this.ruta + '/indexdep', departamento);
  }

  show(id){
    return this.HttpClient.get(this.ruta + '/indexdep/' + id);
  }

  update(departamento:Departamento, id){
    return this.HttpClient.put(this.ruta + '/indexdep/' + id, departamento);
  }

  destroy(id){
    return this.HttpClient.delete(this.ruta + '/indexdep/' + id);
  }
}
