import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [LoginProvider, ErrorHandlerProvider]
})
export class LoginPage {

	private loginForm: FormGroup;
	pushPage: any;
	constructor(
		public navCtrl: NavController,
		private loginPost: LoginProvider,
		private formBuilder: FormBuilder,
		private errorHandle: ErrorHandlerProvider,
		public storage: Storage
	) {
		this.pushPage = SignupPage;
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.minLength(4)]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}
	submitForm() {
		console.log(this.loginForm.value)
		this.loginPost.postLoginCred(this.loginForm.value)
			.subscribe((data) => {
				console.log(data)
				this.storage.set('token', data.token);
				this.storage.set('username', data.username);
				this.storage.set('email', data.email);

				this.errorHandle.presentToast('Welcome back!');
				this.navCtrl.setRoot(HomePage, {}, { animate: true, animation: 'ios-transition', direction: 'forward' })
			},
			(err) => {
				this.errorHandle.errorCtrl(err);
			}
			)
	}

}
