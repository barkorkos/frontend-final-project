import { BadRequestError } from 'common/bad-request-error';
import { NotFoundError } from 'common/not-found-error';
import { AppError } from 'common/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getOne(resource) {
    console.log(resource)
    return this.http.get(this.url, resource)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(resource) {
    console.log(resource)
    return this.http.post(this.url, resource)
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(resource) {
    console.log(resource);
    return this.http.patch(this.url + '/' + resource.id, resource)
      .map(response => response.json())      
      .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .map(response => response.json())
      .toPromise()
      .catch(this.handleError);
  }

  login(credentials) {
    console.log(credentials);
    return this.http.post(this.url, credentials)
    .map(response => {
      console.log(response.json());
      let result = response.json();
      if(result && result.token){
        localStorage.setItem('token',result.token);
        return true;
      }
      return false;
    });
  }



  private handleError(error: Response) {

    if (error.status === 400)
      return Observable.throw(new BadRequestError(error));
  
    if (error.status === 404){
      return Observable.throw(new NotFoundError(error));
    }
    
    return Observable.throw(new AppError(error));
  }
}
