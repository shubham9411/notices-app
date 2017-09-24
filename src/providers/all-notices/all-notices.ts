import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AllNoticesProvider {
  constructor(public http: Http) {
  }
  getAllNotices(){
    return this.http.get('http://127.0.0.1:8000/api/')
      .map( res => res.json() )
  }
}
