import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class AllNoticesProvider {
  constructor(public http: Http, private api: ApiEndpointsProvider) {
  }
  getAllNotices(){
    return this.http.get(this.api.getBaseAPI())
      .map( res => res.json() )
  }
}
