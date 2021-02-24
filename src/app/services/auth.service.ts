import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private ruta: string = environment.apiGeneral;
  private _user: User | undefined;
  public loginService:boolean =false;
  get user() {
    return this._user;
  }
  constructor(private httpClient: HttpClient) {}
  login(login: string, password: string) {
    return this.httpClient
      .get<User>(this.ruta + '/login/' + login + '/' + password)
      .pipe(
        tap((user) => (this._user = user[0])),
        tap((user) => {
          
          if (user[0]) localStorage.setItem('token', user[0].usu_dni);
        }),
        tap(()=>{
          this.loginService=true;
        })
      );
    console.log(this._user);
  }
  verificaAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      console.log('aaaj');
      return of(false);
      
    } else {
      let id = localStorage.getItem('token'); 
     
      return this.httpClient.get<User>(this.ruta + '/verified/' + id).pipe(
        tap((user) => (this._user = user[0])),
        map((user) => {
          console.log('map', user);
          console.log('aaa2j');
          return true;
        })
      );
    }
  }
  cargarData(){
    
      let id2 = localStorage.getItem('token'); 
      this.loginService=true;
      return this.httpClient.get(this.ruta+'/verified/'+id2);
      
   
  }
}
