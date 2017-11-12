import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';
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
	constructor(
		public navCtrl: NavController,
		private allNotices: AllNoticesProvider,
		private errorHandle: ErrorHandlerProvider,
		private menu: MenuController
	) {
		this.query = 'all';
		this.getNotices();
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
	}
	addNewNotice() {
		// logic for adding notices
		this.navCtrl.push(CreateNewPage);
	}
}
