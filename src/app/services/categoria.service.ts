import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../interfaces/categoria';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private ruta:string =environment.apiGeneral;
  constructor(private HttpClient:HttpClient) { }
  insertCategoria(categoria:Categoria){
    return this.HttpClient.post(this.ruta+'/indexdep',categoria);
  }
  
  
  getCategoria(){
    return this.HttpClient.get(this.ruta+'/indexdep');
  }

  editarCategoria(Categoria:Categoria){
    return this.HttpClient.put(this.ruta+'/indexdep/'+Categoria.dep_id,Categoria)
  }
  deleteCategoria(codCategoria:number){
    return this.HttpClient.delete(this.ruta+'/indexdep/'+codCategoria);
  }
}
