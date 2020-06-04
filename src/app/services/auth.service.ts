import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService{

  constructor(http: Http) {
    super('https://vr-final-project.herokuapp.com/login', http);
   }

   isLoggedIn() {
     let jwtHelper = new JwtHelper();
     let token = localStorage.getItem('token');
     if(!token)
     {
       console.log("notLogin");
       return false;
     }
     console.log("YeyyLogin");
     return true;
    //return tokenNotExpired();
   }

   get currentUser() {
    let token = localStorage.getItem('token');
    if(!token) return null;

    let jwtHelper = new JwtHelper();
    var x =jwtHelper.decodeToken(token);
    console.log(x);
    return jwtHelper.decodeToken(token);
   }
  
}
