import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@Component({
	selector: 'page-details',
	templateUrl: 'details.html',
})
export class DetailsPage {
	notice: any;
	staticMedia: string;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private api: ApiEndpointsProvider,
		private socialSharing: SocialSharing,
		private errorHandle: ErrorHandlerProvider
	) {
		this.notice = this.navParams.get('data');
		console.log(this.notice);
		this.staticMedia = this.api.getStaticMedia();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetailsPage');
	}
	shareNotice(notice: any = null) {
		let options = {};
		if (!notice) {
			options = {
				'message': 'Get all the college notices directly to your phone. Download the Notices app from Play Store!',
			}
		} else {
			options = {
				'message': notice.notice_name + ' - ' + notice.notice_desc + '- Download Notices app to get more updates.',
			}
		}
		this.socialSharing.shareWithOptions(options)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				this.errorHandle.presentToast('An error occured!');
			})
	}

}
