import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@Component({
	selector: 'page-my-notices',
	templateUrl: 'my-notices.html',
	providers: [AllNoticesProvider]
})
export class MyNoticesPage {
	notices: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private allNotices: AllNoticesProvider,
		private errorHandle: ErrorHandlerProvider
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MyNoticesPage');
		this.getMyNotices();
	}

	getMyNotices(refresher = null) {
		this.allNotices.getMyNotices()
			.subscribe(data => {
				this.notices = data;
				if (!refresher == false)
					refresher.complete();
			}, error => {
				this.errorHandle.errorCtrl(error);
				if (!refresher == false)
					refresher.complete();
			})
	}
}
