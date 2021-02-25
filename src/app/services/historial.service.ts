import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private ruta:string =environment.apiGeneral;

  constructor(private HttpClient:HttpClient) { }

  getHistorial(dni){
    return this.HttpClient.get(this.ruta + '/historial/' + dni);
  }

  getDetalle(id){
    return this.HttpClient.get(this.ruta + '/listar_det/' + id);
  }
}
