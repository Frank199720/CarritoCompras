import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prueba } from '../interfaces/prueba';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor( private http:HttpClient) {

   }
   getPrueba(){
     return this.http.get("http://localhost:3000/heroes");
   }
}
