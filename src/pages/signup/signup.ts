import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { SignupProvider } from '../../providers/signup/signup';
import { ThanksSignupPage } from '../../pages/thanks-signup/thanks-signup';
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
			fullname: ['', [Validators.required, Validators.minLength(4)]],
			username: ['', [Validators.required, Validators.minLength(2)]],
			phonenumber: ['', [Validators.required, Validators.minLength(10)]],
		});
	}

	submitForm() {
		console.log(this.signupForm.value)
		if (!this.signupForm.get('fullname').valid) {
			this.errorHandle.presentToast('Name must have 4 characters!');
			return;
		}
		if (!this.signupForm.get('username').valid) {
			this.errorHandle.presentToast('Username must have 2 characters!');
			return;
		}
		if (!this.signupForm.get('phonenumber').valid) {
			this.errorHandle.presentToast('Phone Number must have 10 digits!');
			return;
		}
		if (!this.signupForm.value.email) {
			this.errorHandle.presentToast('Email can\'t be empty');
			return;
		}
		if (!this.signupForm.get('email').valid) {
			this.errorHandle.presentToast('Invalid Email!');
			return;
		}
		if (!this.signupForm.value.password) {
			this.errorHandle.presentToast('Password can\'t be empty');
			return;
		}
		if (!this.signupForm.get('password').valid) {
			this.errorHandle.presentToast('Password must contain 6 characters.');
			return;
		}
		if (this.signupForm.value.password != this.signupForm.value.confirm_password) {
			this.errorHandle.presentToast('Password do not match!');
			return;
		}
		if (!this.signupForm.valid) {
			this.errorHandle.presentToast('');
			return;
		}
		this.signup.postSignupCred(this.signupForm.value)
			.subscribe((data) => {
				console.log(data)
				this.storage.set('token', data.token);
				this.storage.set('username', data.username);
				this.storage.set('email', data.email);
				this.storage.set('profileData', data);
				this.errorHandle.presentToast('Welcome to the Notices!');
				this.navCtrl.push(ThanksSignupPage);
			},
			(err) => {
				this.errorHandle.errorCtrl(err);
			}
			)
	}

}
