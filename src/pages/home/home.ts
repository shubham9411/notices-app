import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController, Slides } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

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
		private menu: MenuController,
		private socialSharing: SocialSharing
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
	shareApp() {
		var options = {
			message: 'You can download Notices app from Play Store. [link](https://foobar.com/)', // not supported on some apps (Facebook, Instagram)
			subject: 'Notices App', // fi. for email
			files: ['', ''], // an array of filenames either locally or remotely
			url: 'https://www.foobar.com/#',
			chooserTitle: 'Share Notices App' // Android only, you can override the default share sheet title
		}
		this.socialSharing.shareWithOptions(options)
			.then( result => {
				console.log("Share completed? " + result.completed);
				console.log("Shared to app: " + result.app);
			})
			.catch( err=> {
				console.log("Sharing failed with message: " + err);
			})
	}
}
