import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides, Platform, FabContainer } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { CreateNewPage } from '../../pages/create-new/create-new';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [AllNoticesProvider, ErrorHandlerProvider]
})
export class HomePage {
	noticesAll: any;
	noticesYear: any;
	noticesDept: any;
	noticesClass: any;
	is_admin: boolean;
	isFab: boolean = false;
	warnedExit: boolean = false;
	@ViewChild('fab') fab: FabContainer;
	constructor(
		platform: Platform,
		public navCtrl: NavController,
		private allNotices: AllNoticesProvider,
		private errorHandle: ErrorHandlerProvider,
		private menu: MenuController,
		private storage: Storage
	) {
		this.query = 'all';
		this.getNotices();
		this.storage.get('is_admin')
			.then(res => {
				this.is_admin = res;
			})
		platform.registerBackButtonAction(() => {
			if (this.menu.isOpen()) {
				this.menu.close()
			} else if (this.isFab) {
				this.toggleFab();
				this.fab.close();
				return;
			} else if (this.navCtrl.canGoBack()) {
				this.navCtrl.pop();
			} else {
				if (this.navCtrl.getActive() && this.navCtrl.getActive().name !== 'HomePage') {
					this.navCtrl.setRoot(HomePage, {}, { animate: true })
				} else if (!this.warnedExit) {
					this.warnedExit = true;
					this.errorHandle.presentToast('Press back again to exit.');
					setTimeout(() => {
						this.warnedExit = false;
						console.log('3 sec poorse hue')
					}, 3000)
				} else {
					platform.exitApp();
				}
			}
		});
	}
	getNotices(refresher = null) {
		console.log(this.query);
		if (this.query == 'all') {
			this.allNotices.getAllNotices()
				.subscribe(data => {
					this.noticesAll = data;
					if (!refresher == false)
						refresher.complete();
				}, error => {
					this.errorHandle.errorCtrl(error);
					if (!refresher == false)
						refresher.complete();
				})
		} else if (this.query == 'year') {
			this.allNotices.getYearNoticesAPI()
				.subscribe(data => {
					this.noticesYear = data;
					if (!refresher == false)
						refresher.complete();
				}, error => {
					this.errorHandle.errorCtrl(error);
					if (!refresher == false)
						refresher.complete();
				})
		} else if (this.query == 'dept') {
			this.allNotices.getDeptNoticesAPI()
				.subscribe(data => {
					this.noticesDept = data;
					if (!refresher == false)
						refresher.complete();
				}, error => {
					this.errorHandle.errorCtrl(error);
					if (!refresher == false)
						refresher.complete();
				})
		} else if (this.query == 'class') {
			this.allNotices.getClassNoticesAPI()
				.subscribe(data => {
					this.noticesClass = data;
					if (!refresher == false)
						refresher.complete();
				}, error => {
					this.errorHandle.errorCtrl(error);
					if (!refresher == false)
						refresher.complete();
				})
		} else {
			if (!refresher == false)
				refresher.complete();
		}
	}
	@ViewChild(Slides) slides: Slides;
	public query: string = 'all';

	showdata() {
		if (this.query == 'all') {
			this.slides.slideTo(0, 0);
		}
		if (this.query == 'year') {
			this.slides.slideTo(1, 0);
		}
		if (this.query == 'dept') {
			this.slides.slideTo(2, 0);
		}
		if (this.query == 'class') {
			this.slides.slideTo(3, 0);
		}
	}

	slideChanged() {
		if (this.slides._activeIndex == 0) {
			this.query = 'all';
			this.getNotices();
		}
		if (this.slides._activeIndex == 1) {
			this.query = 'year';
			this.getNotices();
		}
		if (this.slides._activeIndex == 2) {
			this.query = 'dept';
			this.getNotices();
		}
		if (this.slides._activeIndex == 3) {
			this.query = 'class';
			this.getNotices();
		}
	}

	ionViewDidEnter() {
		// the root left menu should be disabled on the tutorial page
		this.menu.swipeEnable(true);
		console.log('hey yo!')
	}
	addNewNotice(fab: FabContainer) {
		// logic for adding notices
		fab.close();
		this.navCtrl.push(CreateNewPage);
	}
	toggleFab() {
		this.isFab = !this.isFab;
	}
}
