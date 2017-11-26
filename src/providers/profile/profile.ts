import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { AuthHttp } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class ProfileProvider {

	constructor(
		private api: ApiEndpointsProvider,
		public storage: Storage,
		private authHttp: AuthHttp) {
		console.log('Hello ProfileProvider Provider');
	}

	getProfileInfo() {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");

		return this.authHttp.get(this.api.getProfileAPI(), { headers: headers })
			.map(res => res.json());

	}

	postProfileInfo(data: any) {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");

		return this.authHttp.post(this.api.getProfileAPI(), data, { headers: headers })
			.map(res => res.json());
	}

}
