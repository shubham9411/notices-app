import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
@Component({
	selector: 'page-welcome',
	templateUrl: 'welcome.html',
})
export class WelcomePage {
	slides = [
		{
			title: "Welcome to the Notices!",
			description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
			image: "assets/img/ica-slidebox-img-1.png",
		},
		{
			title: "What is Ionic?",
			description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
			image: "assets/img/ica-slidebox-img-2.png",
		},
		{
			title: "What is Ionic Cloud?",
			description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
			image: "assets/img/ica-slidebox-img-3.png",
		}
	];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storage: Storage
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad WelcomePage');
	}

	continue() {
		console.log('Continue!');
		this.storage.set('hasSeenTutorial', true);
		this.navCtrl.setRoot(LoginPage, {}, { animate: true, animation: 'ios-transition', direction: 'forward' })
	}

}
