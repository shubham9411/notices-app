import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AllNoticesProvider } from '../../providers/all-notices/all-notices';

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
		private allNotices: AllNoticesProvider
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MyNoticesPage');
		this.getMyNotices();
	}

	getMyNotices() {
		this.allNotices.getMyNotices()
			.subscribe(res => {
				this.notices = res;
			})
	}
	getNotices(refresher) {
		refresher.hide();
	}

}
