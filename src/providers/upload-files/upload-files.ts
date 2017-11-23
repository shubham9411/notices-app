import { Injectable } from '@angular/core';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';

import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';

@Injectable()
export class UploadFilesProvider {

	constructor(
		public storage: Storage,
		private transfer: Transfer,
		private api: ApiEndpointsProvider
	) {
		console.log('Hello UploadFilesProvider Provider');
	}
	uploadProfile(fileData: any) {
		const fileTransfer: TransferObject = this.transfer.create();
		this.storage.get('token').then(token => {
			let options: FileUploadOptions = {
				fileKey: 'image',
				fileName: fileData.substr(fileData.lastIndexOf('/') + 1),
				headers: { 'Authorization': 'jwt ' + token }
			}
			console.log(fileData);
			console.log('imageData');
			console.log(this.api.getProfileAPI())
			fileTransfer.upload(fileData, this.api.getProfileAPI(), options)
				.then((data) => {
					console.log('success', data);
				}, (err) => {
					console.log("error" + JSON.stringify(err));
				});
		});
	}
	createNewNotice(data: any, file: string='') {
		const fileTransfer: TransferObject = this.transfer.create();
		this.storage.get('token').then(token => {
			let options: FileUploadOptions = {
				fileKey: 'image',
				fileName: file.substr(file.lastIndexOf('/') + 1),
				headers: { 'Authorization': 'jwt ' + token }
			}
			console.log(file);
			console.log('imageData');
			fileTransfer.upload(file, this.api.getProfileAPI(), options)
				.then((data) => {
					console.log('success', data);
				}, (err) => {
					console.log("error" + JSON.stringify(err));
				});
		});
	}

}
