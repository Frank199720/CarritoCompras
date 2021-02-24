import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../interfaces/Marca';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private ruta:string =environment.apiGeneral;
  constructor(private HttpClient:HttpClient) { }

  index(){
    return this.HttpClient.get(this.ruta + '/indexmar');
  }

  store(marca:Marca){
    return this.HttpClient.post(this.ruta + '/indexmar', marca);
  }

  show(id){
    return this.HttpClient.get(this.ruta + '/indexmar/' + id);
  }

  update(marca:Marca, id){
    return this.HttpClient.put(this.ruta + '/indexmar/' + id, marca);
  }

  destroy(id){
    return this.HttpClient.delete(this.ruta + '/indexmar/' + id);
  }
}
