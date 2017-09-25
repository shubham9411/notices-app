import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [LoginProvider]
})
export class LoginPage {

	private loginForm: FormGroup;
	pushPage: any;
	constructor(public navCtrl: NavController, private loginPost: LoginProvider, private formBuilder: FormBuilder, public toastCtrl: ToastController) {
		this.pushPage = SignupPage;
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
	}
	submitForm() {
		console.log(this.loginForm.value)
		this.loginPost.postLoginCred(this.loginForm.value)
			.subscribe((data) => {
				console.log(data)
				localStorage.setItem('token',data.token);
				localStorage.setItem('username',data.username);
				localStorage.setItem('email',data.email);
				this.presentToast('Welcome back!');
				this.navCtrl.setRoot( HomePage, {}, {animate: true,animation: 'ios-transition', direction: 'forward'})
			},
			(err) => {
				let error = JSON.parse(err['_body'])['non_field_errors'];
				this.presentToast(error);
			}
		)
	}

	presentToast(message: string = 'Try again!') {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		toast.present();
	}

}
