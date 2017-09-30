import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AllNoticesProvider } from '../../providers/all-notices/all-notices';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [ AllNoticesProvider, ErrorHandlerProvider ]
})
export class HomePage {
	notices: any
	constructor( public navCtrl: NavController, private allNotices: AllNoticesProvider, private errorHandle: ErrorHandlerProvider ) {
			this.getNotices();
	}
	getNotices( refresher = null ) {
		this.allNotices.getAllNotices()
			.subscribe( data => {
				this.notices = data;
				if( !refresher == false )
					refresher.complete();
			}, error => {
				this.errorHandle.errorCtrl(error);
				if( !refresher == false )
					refresher.complete();
			})
	}
}
