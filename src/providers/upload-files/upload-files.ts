import { Injectable } from '@angular/core';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';

@Injectable()
export class UploadFilesProvider {

	constructor(
		public storage: Storage,
		private transfer: Transfer,
		private api: ApiEndpointsProvider,
	) {
		console.log('Hello UploadFilesProvider Provider');
	}
	uploadProfile(fileData: any) {
		const fileTransfer: TransferObject = this.transfer.create();
		this.storage.get('token').then(token => {
			let options: FileUploadOptions = {
				fileKey: 'image',
				fileName: fileData.substring(fileData.lastIndexOf('/') + 1, fileData.lastIndexOf('?')),
				headers: { 'Authorization': 'jwt ' + token },
				chunkedMode: false
			}
			console.log(fileData);
			console.log('imageData');
			console.log(this.api.getProfileAPI())
			fileTransfer.upload(fileData, this.api.getProfileAPI(), options)
				.then((data) => {
					console.log('success', data);
				}, (err) => {
					console.log(err);
				});
		});
	}
}
