import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { AuthHttp } from 'angular2-jwt';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class AllNoticesProvider {
	constructor(
		private api: ApiEndpointsProvider,
		public storage: Storage,
		private authHttp: AuthHttp
	) {
	}
	getAllNotices() {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");

		return this.authHttp.get(this.api.getAllNoticesAPI(), { headers: headers })
			.map(res => res.json());

	}
}
