import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class AllNoticesProvider {
	constructor(
		public http: Http,
		private api: ApiEndpointsProvider,
		public storage: Storage
	) {
	}
	getAllNotices() {
		let token = this.storage.get('token');
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
