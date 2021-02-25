import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private ruta:string =environment.apiGeneral;

  constructor(private httpClient:HttpClient) { }

  guardarCompra(json:string){
    return this.httpClient.post(this.ruta+'/compras',json)
  }  

}
