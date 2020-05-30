import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService{

  constructor(http: Http) {
    super('http://localhost:8080/login', http);
   }


}
