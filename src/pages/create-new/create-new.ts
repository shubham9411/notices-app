import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UploadFilesProvider } from '../../providers/upload-files/upload-files';

@Component({
	selector: 'page-create-new',
	templateUrl: 'create-new.html',
	providers: [UploadFilesProvider]
})
export class CreateNewPage {
	createForm = {};
	file: string;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private addNotice: UploadFilesProvider
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

	pickFile() {
		console.log('user wants to upload a file')
	}

	submitForm() {
		console.log(this.createForm);
		this.addNotice.createNewNotice(this.createForm, this.file)
	}
}
