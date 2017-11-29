import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';

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
		private api: ApiEndpointsProvider
	) {
		this.notice = this.navParams.get('data');
		console.log(this.notice);
		this.staticMedia = this.api.getStaticMedia();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetailsPage');
	}

}
