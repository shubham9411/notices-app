import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';

import { ApiEndpointsProvider } from '../api-endpoints/api-endpoints';

@Injectable()
export class AllNoticesProvider {
	year: number;
	class: any;
	dept: string;
	headers = new Headers;
	constructor(
		private api: ApiEndpointsProvider,
		public storage: Storage,
		private authHttp: AuthHttp,
		private events: Events
	) {
		this.storage.get('profileData')
			.then(res => {
				if (!!res) {
					this.year = res.profile.year ? res.profile.year : '';
					this.dept = res.profile.branch ? res.profile.branch : '';
					this.class = {
						branch: this.dept,
						year: this.year
					}
				}
			});
		this.headers.append("Content-Type", "application/json");
		this.events.subscribe('user:updated', (profileData) => {
			console.log(profileData);
			console.log('profileData');
			this.updateProfile(profileData);
		});
	}
	updateProfile(profileData) {
		this.year = profileData.profile.year;
		this.dept = profileData.profile.branch;
		this.class = {
			branch: this.dept,
			year: this.year
		}
	}
	getAllNotices() {
		return this.authHttp.get(this.api.getAllNoticesAPI(), { headers: this.headers })
			.map(res => res.json());

	}

	getYearNoticesAPI() {
		return this.authHttp.post(this.api.getYearNoticesAPI(), { year: this.year }, { headers: this.headers })
			.map(res => res.json());

	}

	getDeptNoticesAPI() {
		return this.authHttp.post(this.api.getDeptNoticesAPI(), { branch: this.dept }, { headers: this.headers })
			.map(res => res.json());

	}

	getClassNoticesAPI() {
		return this.authHttp.post(this.api.getClassNoticesAPI(), this.class, { headers: this.headers })
			.map(res => res.json());

	}

	getMyNotices() {
		return this.authHttp.get(this.api.getMyNotices(), { headers: this.headers })
			.map(res => res.json());
	}

	deleteNotice(id: number) {
		return this.authHttp.post(this.api.getDeleteNoticeAPI(), {id: id}, { headers: this.headers })
			.map(res => res.json());
	}
}
