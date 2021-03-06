import { Component } from '@angular/core';
import { NavController, FabContainer, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';
import { CreateNewPage } from '../../pages/create-new/create-new';
import { DetailsPage } from '../details/details';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
	selector: 'page-year',
	templateUrl: '../all/all.html',
})
export class YearPage {
	is_admin: boolean;
	notices: any;
	staticMedia: string;
	title: string = 'Year';
	is_notices: boolean = true;
	constructor(
		public navCtrl: NavController,
		private storage: Storage,
		private allNotices: AllNoticesProvider,
		private errorHandle: ErrorHandlerProvider,
		private api: ApiEndpointsProvider,
		private socialSharing: SocialSharing,
		private app: App
	) {
		this.storage.get('is_admin')
			.then(res => {
				this.is_admin = res;
			})
		this.getNotices();
		this.staticMedia = this.api.getStaticMedia();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad YearPage');
	}
	getNotices(refresher = null) {
		this.allNotices.getYearNoticesAPI()
			.subscribe(data => {
				this.notices = data;
				if (data.length > 0)
					this.is_notices = false;
				if (!refresher == false)
					refresher.complete();
			}, error => {
				if (!this.notices) {
					this.is_notices = true;
				}
				this.errorHandle.errorCtrl(error);
				if (!refresher == false)
					refresher.complete();
			})
	}
	addNewNotice(fab: FabContainer) {
		fab.close();
		this.navCtrl.push(CreateNewPage);
	}
	datailsPage(notice: any) {
		this.push(DetailsPage, { data: notice });
	}
	push(page: any, data: {}) {
		let navs = this.app.getRootNavs();
		if (navs && navs.length > 0) {
			navs[0].push(page, data);
		}
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
