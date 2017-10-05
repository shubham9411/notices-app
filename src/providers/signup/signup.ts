import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class SignupProvider {

	constructor(public http: Http, private api: ApiEndpointsProvider) {
		console.log('Hello SignupProvider Provider');
	}
	postSignupCred(postParms: signupFormData) {
		var headers = new Headers;
		headers.append("Accept", "application/json")
		headers.append("Content-Type", "application/json")
		let options = new RequestOptions({ headers: headers })

		return this.http.post(this.api.getAuthRegisterAPI(), postParms, options)
			.map(res => res.json())
	}
}

interface signupFormData {
	email: string,
	password: string,
	confirm_password: string,
	username: string,
	firstname: string,
	lastname: string,
	phone_no: string
}
