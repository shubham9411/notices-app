import { Component } from '@angular/core';
import { Events, NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';

import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [LoginProvider, ErrorHandlerProvider, JwtHelper]
})
export class LoginPage {

	private loginForm: FormGroup;
	pushPage: any;
	constructor(
		public navCtrl: NavController,
		private loginPost: LoginProvider,
		private formBuilder: FormBuilder,
		private errorHandle: ErrorHandlerProvider,
		public storage: Storage,
		private events: Events,
		private jwtHelper: JwtHelper
	) {
		this.pushPage = SignupPage;
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(4)]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}
	submitForm() {
		console.log(this.loginForm.value)
		if (!this.loginForm.value.username) {
			this.errorHandle.presentToast('Username can\'t be empty');
			return;
		}
		if (!this.loginForm.value.password) {
			this.errorHandle.presentToast('Password can\'t be empty');
			return;
		}
		this.loginPost.postLoginCred(this.loginForm.value)
			.subscribe((data) => {
				let decodeToken = this.jwtHelper.decodeToken(data.token);
				console.log(decodeToken);
				this.storage.set('is_admin', decodeToken.is_admin);
				console.log(data)
				this.storage.set('token', data.token);
				this.storage.set('username', data.username);
				this.storage.set('email', data.email)
					.then(res => this.events.publish('user:login'));
				this.errorHandle.presentToast('Welcome back!');
				this.navCtrl.setRoot(HomePage, {}, { animate: true, animation: 'ios-transition', direction: 'forward' })
			},
			(err) => {
				this.errorHandle.errorCtrl(err);
			}
			)
	}

}
