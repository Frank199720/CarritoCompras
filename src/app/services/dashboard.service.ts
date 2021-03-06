import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private ruta:string =environment.apiGeneral;
  constructor(private HttpClient:HttpClient) { 

  }
  obtenerVentasxPeriodo(){
    return this.HttpClient.get(this.ruta+'/comprasxP');
  }
  obtenerVentasxMesActual(){
    return this.HttpClient.get(this.ruta+'/comprasxM');
  }
  obtenerProductosTop(){
    return this.HttpClient.get(this.ruta+'/listarTOP');
  }
  obtenerClientesTop(){
    return this.HttpClient.get(this.ruta+'/TOPUsuarios');
  }
  obtenerClientes(){
    return this.HttpClient.get(this.ruta+'/usuariosCant');
  }
}
