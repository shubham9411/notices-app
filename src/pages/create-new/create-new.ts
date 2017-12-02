import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { Headers, RequestOptions } from '@angular/http';
import { AlertController } from 'ionic-angular';

import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { MyNoticesPage } from '../../pages/my-notices/my-notices';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

@Component({
	selector: 'page-create-new',
	templateUrl: 'create-new.html',
})
export class CreateNewPage {
	createForm = {};
	file: string;
	formData = new FormData();
	fileTypes = [];
	id: number = 0;
	loader: any;
	next_year: number;
	alertMsg = {
		successTitle: 'Published',
		successSubtitle: 'A new notice has been published! Hurrey!'
	}
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authHttp: AuthHttp,
		private api: ApiEndpointsProvider,
		public alertCtrl: AlertController,
		private errorHandle: ErrorHandlerProvider,
		public loadingCtrl: LoadingController,
	) {
		let date = new Date;
		let notice = this.navParams.get('notice');
		this.next_year = date.getFullYear() + 1;
		this.createForm = {
			notice_name: "",
			notice_desc: "",
			choices: "all",
			valid_till: date.toISOString().split('T')[0],
		}
		console.log(notice);
		if (notice) {
			this.createForm = notice;
			this.id = notice.id;
			if (!this.createForm['notice_file']) {
				delete this.createForm['notice_file'];
			}
			this.alertMsg = {
				successTitle: 'Updated',
				successSubtitle: 'Your notice has been Updated! Hurrey!'
			};
		}
		this.fileTypes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'application/pdf',
			'application/msword',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/vnd.ms-excel',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.ms-powerpoint',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
		]
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CreateNewPage');
	}

	submitForm() {
		for (let key in this.createForm) {
			console.log('key')
			console.log(key)
			if (key == 'notice_name' && this.createForm[key] == '') {
				console.log('here');
				this.errorHandle.presentToast('Notice Title can\'t be empty');
				return;
			}
			if (key == 'notice_desc' && this.createForm[key] == '') {
				console.log('here');
				this.errorHandle.presentToast('Notice Description can\'t be empty');
				return;
			}
			if (key == 'year') {
				let date = new Date(this.createForm[key]);
				this.formData.append(key, date.getFullYear().toString());
			}
			else
				this.formData.append(key, this.createForm[key]);
		}
		this.formData.append('id', this.id.toString());
		console.log(this.createForm);
		console.log(this.formData);
		const headers = new Headers({});
		let options = new RequestOptions({ headers });
		this.createLoader();
		this.loader.present().then(() => {
			this.authHttp.post(this.api.getAddNoticesAPI(), this.formData, options)
				.finally(() => {
					this.loader.dismiss();
				})
				.subscribe(res => {
					let body = res.json();
					console.log(body)
					let alert = this.alertCtrl.create({
						title: this.alertMsg.successTitle,
						subTitle: this.alertMsg.successSubtitle,
						buttons: [{
							text: 'Ok',
							handler: data => {
								console.log('OK clicked');
								console.log(data);
								this.navCtrl.setRoot(MyNoticesPage, {}, { animate: true, animation: 'ios-transition', direction: 'forward' })
							}
						}]
					});
					alert.present();
					this.formData = new FormData;

				});
		})
	}
	updated($event) {
		const files = $event.target.files || $event.srcElement.files;
		const file = files[0];
		let ifFile = this.fileTypes.filter((val) => {
			if (file && file.type)
				return val == file.type
		})
		if (!ifFile.length) {
			$event.target.value = '';
			this.errorHandle.presentToast('This file type is not allowed!')
		} else {
			this.formData.append('notice_file', file);
		}
	}
	updateNoticeFor() {
		let choice = this.createForm['choices'];
		let notice_name = this.createForm['notice_name'] ? this.createForm['notice_name'] : '';
		let notice_desc = this.createForm['notice_desc'] ? this.createForm['notice_desc'] : '';
		let date = new Date;
		this.createForm = {};
		if (choice == 'all') {
			this.createForm = {
				choices: "all"
			}
		} else if (choice == 'year') {
			this.createForm = {
				choices: "year",
				year: date.toISOString().split('T')[0]
			}
		} else if (choice == 'dept') {
			this.createForm = {
				choices: "dept",
				branch: 'cse'
			}
		} else if (choice == 'class') {
			this.createForm = {
				choices: "class",
				year: date.toISOString().split('T')[0],
				branch: 'cse'
			}
		}
		this.createForm['valid_till'] = date.toISOString().split('T')[0];
		this.createForm['notice_name'] = notice_name;
		this.createForm['notice_desc'] = notice_desc;
		console.log(this.createForm);
	}
	createLoader() {
		this.loader = this.loadingCtrl.create({
			content: "Please wait...",
		});
	}
}
