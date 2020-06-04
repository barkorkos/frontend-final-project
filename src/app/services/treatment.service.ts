import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Http } from '@angular/http';

@Injectable()
export class TreatmentService extends DataService {
  constructor(http: Http){
    super('https://vr-final-project.herokuapp.com/treatment', http);
}
}
