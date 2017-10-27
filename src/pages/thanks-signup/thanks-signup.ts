import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../../pages/home/home';

@Component({
	selector: 'page-thanks-signup',
	templateUrl: 'thanks-signup.html',
})
export class ThanksSignupPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ThanksSignupPage');
	}

	goToHomePage() {
		this.navCtrl.setRoot(HomePage, {}, { animate: true, animation: 'ios-transition', direction: 'forward' })
	}

}
