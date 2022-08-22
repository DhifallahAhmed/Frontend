import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router,UrlTree} from '@angular/router';
@Injectable({
        providedIn: 'root'
})


export class AuthGuard implements CanActivate {
    constructor(private router:Router ){

    }
    token:any;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) /*{
        
        this.token = localStorage.getItem('token');
        if(this.token){
            return true ;
       } else {
        this.router.navigate(['login']);
        } 
    }*/
    :
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
        this.token = localStorage.getItem('token');
        if(this.token) {
            return true;
            //this.router.navigate(['sign-in']);
    } else {
        this.router.navigate(['login']);
        return false;
    } 
  
  }
}