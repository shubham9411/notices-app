import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { CreateNewPage } from '../create-new/create-new';
import { DetailsPage } from '../details/details';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
	selector: 'page-my-notices',
	templateUrl: 'my-notices.html',
	providers: [AllNoticesProvider]
})
export class MyNoticesPage {
	notices: any;
	loader: any;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private allNotices: AllNoticesProvider,
		private errorHandle: ErrorHandlerProvider,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		private socialSharing: SocialSharing
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
	deleteNotice(id) {
		let alert = this.alertCtrl.create({
			title: 'Are you sure!',
			subTitle: 'Once the notice will be deleted you can\'t get them back. Think Again!',
			buttons: [{
				text: 'Cancel',
				handler: data => { this.loader.dismiss(); }
			}, {
				text: 'Delete',
				handler: data => {
					this.allNotices.deleteNotice(id)
						.finally(() => {
							this.loader.dismiss();
						})
						.subscribe(data => {
							console.log(data);
							if (JSON.parse(data['_body']).status == 'success') {
								this.errorHandle.presentToast('Notice has been Deleted!');
							}
							this.getMyNotices();
						}, error => {
							this.errorHandle.presentToast('Something went wrong!');
						})
				}
			}]
		});
		this.createLoader();
		this.loader.present().then(() => {
			alert.present();
		})
	}
	createLoader() {
		this.loader = this.loadingCtrl.create({
			content: "Please wait...",
		});
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
