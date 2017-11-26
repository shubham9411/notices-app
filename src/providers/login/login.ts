import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class LoginProvider {
	constructor(public http: Http, private api: ApiEndpointsProvider) {
	}
	postLoginCred(postParms:loginFormData) {
		var headers = new Headers;
		headers.append( "Accept", "application/json" )
		headers.append( "Content-Type", "application/json" )
		let options = new RequestOptions({ headers: headers })

		return this.http.post(this.api.getAuthLoginAPI(), postParms, options )
			.map( res => res.json() )
	}
}

interface loginFormData {
	email: string,
	password: string
}
