import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
import { Storage } from '@ionic/storage';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class AddNoticesProvider {

	constructor(
		private api: ApiEndpointsProvider,
		private storage: Storage,
		private authHttp: AuthHttp) {
		console.log('Hello AddNoticesProvider Provider');
	}

	postNewNotices(data: any) {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");

		return this.authHttp.post(this.api.getAddNoticesAPI(), data, { headers: headers })
			.map(res => res.json());
	}

}
