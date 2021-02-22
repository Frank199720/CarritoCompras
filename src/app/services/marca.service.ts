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
  insertMarca(Marca:Marca){
    return this.HttpClient.post(this.ruta+'/indexmar',Marca);
  }
  
  
  getMarca(){
    return this.HttpClient.get(this.ruta+'/indexmar');
  }

  editarMarca(Marca:Marca){
    return this.HttpClient.put(this.ruta+'/indexmar/'+Marca.mar_id,Marca)
  }
  deleteMarca(codMarca:number){
    return this.HttpClient.delete(this.ruta+'/indexmar/'+codMarca);
  }
}
