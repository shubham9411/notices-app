import { Component } from '@angular/core';
import { Events, Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage: any;

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		public storage: Storage,
		public events: Events,
		public menu: MenuController,
		splashScreen: SplashScreen
	) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			this.storage.get('hasSeenTutorial')
				.then((hasSeenTutorial) => {
					console.log(hasSeenTutorial);
					if (!hasSeenTutorial) {
						console.log('ss')
						this.rootPage = WelcomePage;
					}
					else if(this.storage.get('token') && this.storage.get('username') && this.storage.get('email') ){
						this.rootPage = HomePage;
					} else {
						this.rootPage = LoginPage;
					}
				});
			splashScreen.hide();
		});
	}
}
