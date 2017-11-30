import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { CreateNewPage } from '../create-new/create-new';
import { DetailsPage } from '../details/details';

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
		private errorHandle: ErrorHandlerProvider,
		public alertCtrl: AlertController,
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
	updateNotice(notice: any) {
		this.navCtrl.push(CreateNewPage, { notice: notice });
	}
	datailsPage(notice: any) {
		this.navCtrl.push(DetailsPage, { data: notice });
	}
	deleteNotice(id){
		let alert = this.alertCtrl.create({
			title: 'Are you sure!',
			subTitle: 'Once the notice will be deleted you can\'t get them back. Think Again!',
			buttons: [{
				text: 'Cancel',
				handler: data => { }
			}, {
				text: 'Delete',
				handler: data => {
					this.allNotices.deleteNotice(id)
						.subscribe(data => {
							this.notices = data;
							this.errorHandle.presentToast('Notice has been Deleted!');
						}, error => {
							this.errorHandle.errorCtrl(error);
						})
				}
			}]
		});
		alert.present();
	}
}
