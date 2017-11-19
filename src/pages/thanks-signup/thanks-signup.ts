import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../../pages/profile/profile';

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

	goToProfilePage() {
		this.navCtrl.setRoot(ProfilePage, {setEdit: true}, { animate: true, animation: 'ios-transition', direction: 'forward' })
	}

}
