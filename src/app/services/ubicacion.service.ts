import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private ruta:string =environment.apiGeneral;

  constructor(private HttpClient:HttpClient) { }

  getDepartamentos(){
    return this.HttpClient.get(this.ruta + '/ubi_dep');
  }

  getProvincias(idDepartamento){
    return this.HttpClient.get(this.ruta + '/ubi_prov/' + idDepartamento);
  }

  getDistritos(idProvincia){
    return this.HttpClient.get(this.ruta + '/ubi_dist/' + idProvincia);
  }
}
