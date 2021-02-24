import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor( private http:HttpClient) { }
  getQuery( query:string){
    const url=`http://dniruc.apisperu.com/api/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InlvbmphMjE5OUBnbWFpbC5jb20ifQ.Tl7oQcflkkbnlHvVo39uH4QHrp6epaHVx4_g7enRa0Q'
    });

    return this.http.get(url,{headers});
}
getPersonaJuridica(ruc){
  return this.getQuery('ruc/'+ruc);
}
}
