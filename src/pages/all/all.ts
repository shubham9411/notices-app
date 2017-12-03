import { Component } from '@angular/core';
import { NavController, NavParams, FabContainer } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';
import { CreateNewPage } from '../../pages/create-new/create-new';
import { DetailsPage } from '../../pages/details/details';

@Component({
	selector: 'page-all',
	templateUrl: 'all.html',
})
export class AllPage {
	is_admin: boolean;
	notices: any;
	staticMedia: string;
	title: string = 'All';
	is_notices: boolean = true;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private allNotices: AllNoticesProvider,
		private errorHandle: ErrorHandlerProvider,
		private api: ApiEndpointsProvider,
		private socialSharing: SocialSharing
	) {
		this.storage.get('is_admin')
			.then(res => {
				this.is_admin = res;
			})
		this.getNotices();
		this.staticMedia = this.api.getStaticMedia();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AllPage');
	}
	getNotices(refresher = null) {
		this.allNotices.getAllNotices()
			.subscribe(data => {
				this.notices = data;
				if(data.length > 0)
					this.is_notices = false;
				if (!refresher == false)
					refresher.complete();
			}, error => {
				this.errorHandle.errorCtrl(error);
				if (!this.notices) {
					this.is_notices = true;
				}
				if (!refresher == false)
					refresher.complete();
			})
	}
	addNewNotice(fab: FabContainer) {
		fab.close();
		this.navCtrl.push(CreateNewPage);
	}
	datailsPage(notice: any) {
		this.navCtrl.push(DetailsPage, { data: notice });
	}
	shareNotice(notice: any = null) {
		let options = {};
		if (!notice) {
			options = {
				'message': 'Get all the college notices directly to your phone. Download the Notices app from Play Store!',
			}
		} else{
			options = {
				'message': notice.notice_name + ' - ' + notice.notice_desc + '- Download Notices app to get more updates.',
			}
		}
		this.socialSharing.shareWithOptions(options)
			.then(res=>{
				console.log(res);
			})
			.catch(err=>{
				this.errorHandle.presentToast('An error occured!');
			})
	}
}
