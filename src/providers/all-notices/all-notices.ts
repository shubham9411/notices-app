import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class AllNoticesProvider {
	constructor(public http: Http, private api: ApiEndpointsProvider) {
	}
	getAllNotices() {
		let token = localStorage.getItem('token');
		var headers = new Headers;
		headers.append( "Accept", "application/json" );
		headers.append( "Content-Type", "application/json" );
		//headers.append( "Authorization", "jwt " + token );
		let options = new RequestOptions({ headers: headers })
		console.log(token)
		return this.http.get(this.api.getAllNoticesAPI(), options)
			.map(res => res.json());
	}
}
