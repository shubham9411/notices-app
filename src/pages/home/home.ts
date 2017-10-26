import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';
import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [AllNoticesProvider, ErrorHandlerProvider]
})
export class HomePage {
	notices: any
	constructor(
		public navCtrl: NavController,
		private allNotices: AllNoticesProvider,
		private errorHandle: ErrorHandlerProvider,
		private menu: MenuController
	) {
		this.getNotices();
	}
	getNotices(refresher = null) {
		if (this.query == 'all') {
			this.allNotices.getAllNotices()
				.subscribe(data => {
					this.notices = data;
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
	public query: string = 'new';

	showdata() {
		if (this.query == 'new') {
			this.slides.slideTo(0, 0);
		}
		if (this.query == 'all') {
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
			this.query = 'new';
		}
		if (this.slides._activeIndex == 1) {
			this.query = 'all';
		}
		if (this.slides._activeIndex == 2) {
			this.query = 'dept';
		}
		if (this.slides._activeIndex == 3) {
			this.query = 'class';
		}
	}

	ionViewDidEnter() {
		// the root left menu should be disabled on the tutorial page
		this.menu.swipeEnable(true);
	}
	addNewNotice() {
		// logic for adding notices
		console.log('not implemented yet!')
	}
}
