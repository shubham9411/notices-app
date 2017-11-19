import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddNoticesProvider } from '../../providers/add-notices/add-notices';

@Component({
	selector: 'page-create-new',
	templateUrl: 'create-new.html',
	providers: [AddNoticesProvider]
})
export class CreateNewPage {
	createForm = {};
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private addNotice: AddNoticesProvider
	) {
		let date = new Date;
		this.createForm = {
			branch: "cse",
			choices: "dept",
			notice_desc: "",
			notice_name: "",
			valid_till: date.toISOString().split('T')[0],
			year: '',
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateNewPage');
	}

	submitForm() {
		console.log(this.createForm);
		this.addNotice.postNewNotices(this.createForm)
			.subscribe(res => {
				console.log(res);
			})
	}

}
