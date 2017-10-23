import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AllNoticesProvider } from '../providers/all-notices/all-notices';
import { ApiEndpointsProvider } from '../providers/api-endpoints/api-endpoints';
import { LoginProvider } from '../providers/login/login';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import { SignupProvider } from '../providers/signup/signup';

import { Storage } from '@ionic/storage';

let storage = new Storage({});

export function getAuthHttp(http) {
	return new AuthHttp(new AuthConfig({
		headerPrefix: 'Bearer',
		noJwtError: true,
		globalHeaders: [{ 'Accept': 'application/json' }],
		tokenGetter: (() => storage.get('token').then((token: string) => token)),
	}), http);
}

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		WelcomePage,
		LoginPage,
		SignupPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpModule,
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		WelcomePage,
		LoginPage,
		SignupPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		AllNoticesProvider,
		ApiEndpointsProvider,
		LoginProvider,
		ErrorHandlerProvider,
		SignupProvider,
		{ provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] }
	]
})
export class AppModule { }
