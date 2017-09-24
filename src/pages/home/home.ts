import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AllNoticesProvider } from '../../providers/all-notices/all-notices';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [ AllNoticesProvider ]
})
export class HomePage {
	notices: any
	constructor( public navCtrl: NavController, private allNotices: AllNoticesProvider ) {
			this.getNotices()
	}
	getNotices( refresher = null ) {
		this.allNotices.getAllNotices()
			.subscribe( data => {
				this.notices = data
				if( !refresher == false )
					refresher.complete()
			})
	}

}
