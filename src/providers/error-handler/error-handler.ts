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
			// error = JSON.parse(err['_body'])['non_field_errors'];
			let ar = JSON.parse(err['_body']);
			let ermsg:string = ar.errors[0];
			let index:number = ermsg.indexOf(':');
			error = ermsg.slice(index+1,ermsg.length);
			// error = ar[Object.keys(ar)[0]];
		} else if( typeErr == 'object') {
			error = 'Try Again!';
		}
		this.presentToast(error);
	}
}
