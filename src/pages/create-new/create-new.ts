import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { Headers, RequestOptions } from '@angular/http';

import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';

@Component({
	selector: 'page-create-new',
	templateUrl: 'create-new.html',
})
export class CreateNewPage {
	createForm = {};
	file: string;
	formData = new FormData();
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authHttp: AuthHttp,
		private api: ApiEndpointsProvider
	) {
		let date = new Date;
		this.createForm = {
			choices: "all",
			valid_till: date.toISOString().split('T')[0],
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateNewPage');
	}

	submitForm() {
		for (let key in this.createForm) {
			console.log(key)
			this.formData.append(key, this.createForm[key]);
			console.log(this.createForm[key]);
		}
		const headers = new Headers({});
		let options = new RequestOptions({ headers });
		this.authHttp.post(this.api.getAddNoticesAPI(), this.formData, options)
			.subscribe(res => {
				let body = res.json();
				console.log(body)
			});
	}
	updated($event) {
		const files = $event.target.files || $event.srcElement.files;
		const file = files[0];
		this.formData.append('notice_file', file);
	}
}
