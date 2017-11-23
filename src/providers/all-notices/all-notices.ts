import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { AuthHttp } from 'angular2-jwt';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class AllNoticesProvider {
	year: number;
	class: any;
	dept: string;
	constructor(
		private api: ApiEndpointsProvider,
		public storage: Storage,
		private authHttp: AuthHttp
	) {
		this.year = 2017;
		this.dept = 'cse';
		this.class = {
			branch: this.dept,
			year: this.year
		}
	}
	getAllNotices() {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");

		return this.authHttp.get(this.api.getAllNoticesAPI(), { headers: headers })
			.map(res => res.json());

	}

	getYearNoticesAPI() {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");

		return this.authHttp.post(this.api.getYearNoticesAPI(), { year:this.year}, { headers: headers })
			.map(res => res.json());

	}

	getDeptNoticesAPI() {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");
		console.log(this.dept);
		return this.authHttp.post(this.api.getDeptNoticesAPI(), {branch: this.dept}, { headers: headers })
			.map(res => res.json());

	}

	getClassNoticesAPI() {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");

		return this.authHttp.post(this.api.getClassNoticesAPI(), this.class, { headers: headers })
			.map(res => res.json());

	}

	getMyNotices() {
		var headers = new Headers;
		headers.append("Content-Type", "application/json");

		return this.authHttp.get(this.api.getMyNotices(), { headers: headers })
			.map(res => res.json());
	}
}
