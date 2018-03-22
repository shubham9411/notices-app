import { Injectable, ViewChild } from '@angular/core';
import { Platform, MenuController, FabContainer, App } from 'ionic-angular';
import { ErrorHandlerProvider } from '../error-handler/error-handler';

@Injectable()
export class BackButtonProvider {
	isFab: boolean = false;
	warnedExit: boolean = false;
	@ViewChild('fab') fab: FabContainer;
	public unregisterBackButtonAction: any;
	constructor(
		private platform: Platform,
		private menu: MenuController,
		private errorHandle: ErrorHandlerProvider,
		private app: App
	) {
		console.log('Hello BackButtonProvider Provider');
	}
	publishOn() {
		this.isFab = false;
		this.warnedExit = false;
		this.backButtonOn();
	}
	publishOff() {
		this.backButtonOff();
	}
	backButtonOn() {
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.customHandleBackButton();
		}, 10);
	}
	backButtonOff() {
		this.unregisterBackButtonAction && this.unregisterBackButtonAction();
	}
	customHandleBackButton() {
		if (this.menu.isOpen()) {
			this.menu.close();
			return;
		} else if (this.isFab) {
			this.toggleFab();
			this.fab.close();
			return;
		} else {
			if (!this.warnedExit) {
				this.warnedExit = true;
				this.errorHandle.presentToast('Press back again to exit.');
				setTimeout(() => {
					this.warnedExit = false;
					console.log('3 sec poorse hue')
				}, 3000)
			} else {
				this.platform.exitApp();
			}
		}
	}
	toggleFab() {
		console.log('fab toggle');
		this.isFab = !this.isFab;
	}

	push(page: any, data: {}) {
		let navs = this.app.getRootNavs();
		if (navs && navs.length > 0) {
			navs[0].push(page, data);
		}
	}

}
