import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html'
})
export class SignupPage {

	pushPage: any;

	constructor(public navCtrl: NavController) {
		this.pushPage = LoginPage;
	}

}
