import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';
import { CreateNewPage } from '../../pages/create-new/create-new';
import { DetailsPage } from '../../pages/details/details';

@Component({
	selector: 'page-department',
	templateUrl: '../all/all.html',
})
export class DepartmentPage {
	is_admin: boolean;
	notices: any;
	staticMedia: string;
	title: string = 'Department';
	is_notices: boolean = true;
	constructor(
		public navCtrl: NavController,
		private storage: Storage,
		private allNotices: AllNoticesProvider,
		private errorHandle: ErrorHandlerProvider,
		private api: ApiEndpointsProvider
	) {
		this.storage.get('is_admin')
			.then(res => {
				this.is_admin = res;
			})
		this.getNotices();
		this.staticMedia = this.api.getStaticMedia();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DepartmentPage');
	}
	getNotices(refresher = null) {
		this.allNotices.getDeptNoticesAPI()
			.subscribe(data => {
				this.notices = data;
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
		this.navCtrl.push(DetailsPage, { data: notice });
	}
}
