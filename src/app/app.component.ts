import { Component, ViewChild } from '@angular/core';
import { Events, Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';

export interface PageInterface {
	title: string;
	name: string;
	component: any;
	icon: string;
	logsOut?: boolean;
	index?: number;
}

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	appPages: PageInterface[] = [
		{ title: 'Welcome', name: 'WelcomePage', component: WelcomePage, index: 0, icon: 'calendar' },
		{ title: 'Home', name: 'HomePage', component: HomePage, index: 1, icon: 'contacts' },
		{ title: 'Home', name: 'HomePage', component: HomePage, index: 2, icon: 'map' },
		{ title: 'About', name: 'AboutPage', component: AboutPage, index: 3, icon: 'information-circle' },
		{ title: 'Logout', name: 'Logout', component: LoginPage, index: 3, icon: 'log-out' }
	];
	rootPage: any;
	jwtHelper: JwtHelper = new JwtHelper();
	username: string;
	email: string;
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
			this.menu.swipeEnable(false)
			this.storage.get('hasSeenTutorial')
				.then((hasSeenTutorial) => {
					console.log(hasSeenTutorial);
					if (!hasSeenTutorial) {
						console.log('ss')
						this.rootPage = WelcomePage;
					}
					else if (this.storage.get('token') && this.storage.get('username') && this.storage.get('email')) {
						this.storage.get('token')
							.then(token => {
								if (!!token && !this.jwtHelper.isTokenExpired(token)) {

									this.rootPage = HomePage;
									this.storage.get('username')
										.then(name => this.username = name);
									this.storage.get('email')
										.then(email => this.email = email);

								} else {
									this.rootPage = LoginPage;
								}
							});
					} else {
						this.rootPage = LoginPage;
					}
				});
			splashScreen.hide();
		});
	}
	openPage(page: PageInterface) {
		if (page.component == LoginPage) {
			this.menu.swipeEnable(false);
			this.storage.remove('token');
			this.storage.remove('username');
			this.storage.remove('email');
		}
		this.nav.setRoot(page.component).catch((err: any) => {
			console.log(`Didn't set nav root: ${err}`);
		});
	}
	isActive(page: PageInterface) {
		if (this.nav.getActive() && this.nav.getActive().name === page.name) {
			return 'primary';
		}
		return;
	}
}
