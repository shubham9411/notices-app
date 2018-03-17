import { Injectable } from '@angular/core';
import { Events, App } from 'ionic-angular';

@Injectable()
export class BackButtonProvider {

	constructor(
		public events: Events,
		private app: App
	) {
		console.log('Hello BackButtonProvider Provider');
	}

	publishOn() {
		console.log('event published: backbutton:on');
		this.events.publish('backButton:on');
	}
	publishOff() {
		console.log('event published: backbutton:off');
		this.events.publish('backButton:off');
	}

	push(page: any, data: {}){
		let navs = this.app.getRootNavs();
		if(navs && navs.length>0){
			navs[0].push(page, data);
		}
	}

}
