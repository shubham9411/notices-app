import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AllNoticesProvider {
  constructor(public http: Http) {
  }
  getAllNotices(){
    return this.http.get('http://192.168.43.215:8000/api/')
      .map(res=> res.json())
  }
}
