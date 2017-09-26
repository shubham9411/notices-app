import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ToastController } from 'ionic-angular';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [ AllNoticesProvider ]
})
export class HomePage {
	notices: any
	constructor( public navCtrl: NavController, private allNotices: AllNoticesProvider, public toastCtrl: ToastController ) {
			this.getNotices()
	}
	getNotices( refresher = null ) {
		this.allNotices.getAllNotices()
			.subscribe( data => {
				this.notices = data
				if( !refresher == false )
					refresher.complete()
			}, error => {
				this.presentToast('An error Occured!')
				if( !refresher == false )
					refresher.complete()
			})
	}

	presentToast(message: string = 'Try again!') {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		toast.present();
	}
}
