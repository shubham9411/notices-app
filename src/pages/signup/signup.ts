import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { SignupProvider } from '../../providers/signup/signup';
import { HomePage } from '../../pages/home/home';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { LoginPage } from '../../pages/login/login';

@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
	providers: [SignupProvider, ErrorHandlerProvider]
})
export class SignupPage {

	private signupForm: FormGroup;
	pushPage: any;

	constructor(
		public navCtrl: NavController,
		private signup: SignupProvider,
		private formBuilder: FormBuilder,
		private errorHandle: ErrorHandlerProvider,
		public storage: Storage
	) {
		this.pushPage = LoginPage;
		this.signupForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirm_password: ['', [Validators.required, Validators.minLength(6)]],
			firstname: ['', [Validators.required]],
			lastname: ['', [Validators.required]],
			username: ['', [Validators.required]],
			phone_no: ['', [Validators.required]],
		});
	}

	submitForm() {
		console.log(this.signupForm.value)
		this.signup.postSignupCred(this.signupForm.value)
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
