import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private AuthService:AuthService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AuthService.verificaAuth()
    .pipe(
      tap( isAutenticado =>{
        if(!isAutenticado){
          this.router.navigateByUrl('/shop/principal')
        }
      })
    )
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AuthService.verificaAuth()
      .pipe(
        tap( isAutenticado =>{
          if(!isAutenticado){
            this.router.navigateByUrl('/shop/principal')
          }
        })
      )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.AuthService.verificaAuth()
      .pipe(
        tap( isAutenticado =>{
          if(!isAutenticado){
            this.router.navigateByUrl('/shop/principal')
          }
        })
      )
  }
}
