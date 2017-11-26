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
import { ProfilePage } from '../pages/profile/profile';
import { CreateNewPage } from '../pages/create-new/create-new';
import { MyNoticesPage } from '../pages/my-notices/my-notices';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import { ProfileProvider } from '../providers/profile/profile';
import { ApiEndpointsProvider } from '../providers/api-endpoints/api-endpoints';

export interface PageInterface {
	title: string;
	name: string;
	component: any;
	icon: string;
	index?: number;
}

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	is_admin: boolean;
	adminPages: PageInterface[] = [
		{ title: 'Create New', name: 'CreateNewPage', component: CreateNewPage, index: 1, icon: 'create' },
		{ title: 'My Notices', name: 'MyNoticesPage', component: MyNoticesPage, index: 2, icon: 'list' },
	];
	appPages: PageInterface[] = [
		{ title: 'Home', name: 'HomePage', component: HomePage, index: 0, icon: 'home' },
		{ title: 'Profile', name: 'ProfilePage', component: ProfilePage, index: 1, icon: 'person' },
		{ title: 'About', name: 'AboutPage', component: AboutPage, index: 2, icon: 'information-circle' },
		{ title: 'Logout', name: 'Logout', component: LoginPage, index: 3, icon: 'log-out' }
	];
	rootPage: any;
	jwtHelper: JwtHelper = new JwtHelper();
	username: string;
	email: string;
	warnedExit: boolean = false;
	full_name: string;
	avatar: string = 'assets/img/placeholder.png';
	constructor(
		platform: Platform,
		statusBar: StatusBar,
		public storage: Storage,
		public events: Events,
		public menu: MenuController,
		splashScreen: SplashScreen,
		private error: ErrorHandlerProvider,
		private profile: ProfileProvider,
		private api: ApiEndpointsProvider
	) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			this.menu.swipeEnable(false);
			platform.registerBackButtonAction(() => {
				if (this.menu.isOpen()) {
					this.menu.close()
				} else if (this.nav.canGoBack()) {
					this.nav.pop();
				} else {
					if (this.nav.getActive() && this.nav.getActive().name !== 'HomePage') {
						this.nav.setRoot(HomePage, {}, { animate: true })
					} else if (!this.warnedExit) {
						this.warnedExit = true;
						this.error.presentToast('Press back again to exit.');
						setTimeout(() => {
							this.warnedExit = false;
							console.log('3 sec poorse hue')
						}, 3000)
					} else {
						platform.exitApp();
					}
				}
			});
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
									this.events.publish('user:login');
								} else {
									this.rootPage = LoginPage;
								}
							});
					} else {
						this.rootPage = LoginPage;
					}
				});
			splashScreen.hide();
			events.subscribe('user:login', () => {
				this.storage.get('is_admin')
					.then(res => {
						this.is_admin = res;
					})
				console.log('sss');
				this.storage.get('username')
					.then(name => { this.username = name; console.log(name); console.log(this.username) });
				this.storage.get('email')
					.then(email => this.email = email);
				console.log(this.username);
				this.profile.getProfileInfo()
					.subscribe(res=>{
						console.log(res);
						let profileData = JSON.stringify(res);
						this.storage.set('profileData',profileData);
						this.avatar = this.api.getStaticMedia() + res[0].profile.image;
						this.full_name = res[0].fullname;
					})
			});
		});
	}
	openPage(page: PageInterface) {
		if (page.component == LoginPage) {
			this.menu.swipeEnable(false);
			this.storage.clear();
			this.storage.set('hasSeenTutorial',true);
			this.error.presentToast('You have successfully logged out!');
		}
		this.nav.setRoot(page.component).catch((err: any) => {
			console.log(`Didn't set nav root: ${err}`);
		});
		this.menu.close();
	}
	isActive(page: PageInterface) {
		if (this.nav.getActive() && this.nav.getActive().name === page.name) {
			return 'primary';
		}
		return;
	}
}
