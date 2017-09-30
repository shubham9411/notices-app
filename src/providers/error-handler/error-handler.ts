import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ErrorHandlerProvider {

	constructor(private toastCtrl: ToastController) {
		console.log('Hello ErrorHandlerProvider Provider');
	}

	presentToast(message: string = 'An error occured! Try Again') {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		toast.present();
	}
	errorCtrl(err: any){
		let error = '',
			typeErr;
		typeErr = typeof(err['_body']);
		console.log(err['_body'])
		console.log(typeof(err['_body']))
		if( typeErr== 'string'){
			error = JSON.parse(err['_body'])['non_field_errors'];
		} else if( typeErr == 'object') {
			error = 'Try Again!';
		}
		this.presentToast(error);
	}
}
