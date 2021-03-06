import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Transfer } from '@ionic-native/transfer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ImagePicker } from '@ionic-native/image-picker';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AboutPage } from '../pages/about/about';
import { ThanksSignupPage } from '../pages/thanks-signup/thanks-signup';
import { ProfilePage } from '../pages/profile/profile';
import { CreateNewPage } from '../pages/create-new/create-new';
import { MyNoticesPage } from '../pages/my-notices/my-notices';
import { TabsPage } from '../pages/tabs/tabs';
import { AllPage } from '../pages/all/all';
import { YearPage } from '../pages/year/year';
import { DepartmentPage } from '../pages/department/department';
import { ClassPage } from '../pages/class/class';
import { DetailsPage } from '../pages/details/details';

import { AllNoticesProvider } from '../providers/all-notices/all-notices';
import { ApiEndpointsProvider } from '../providers/api-endpoints/api-endpoints';
import { LoginProvider } from '../providers/login/login';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import { SignupProvider } from '../providers/signup/signup';
import { ProfileProvider } from '../providers/profile/profile';

import { Storage } from '@ionic/storage';
import { ProfileCaptureProvider } from '../providers/profile-capture/profile-capture';
import { UploadFilesProvider } from '../providers/upload-files/upload-files';

import { DirectivesModule } from "../directives/directives.module";
let storage = new Storage({});

export function getAuthHttp(http) {
	return new AuthHttp(new AuthConfig({
		headerPrefix: 'jwt',
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
		SignupPage,
		AboutPage,
		ThanksSignupPage,
		ProfilePage,
		CreateNewPage,
		MyNoticesPage,
		TabsPage,
		AllPage,
		YearPage,
		DepartmentPage,
		ClassPage,
		DetailsPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp, {
			tabsHideOnSubPages: true
		}),
		HttpModule,
		IonicStorageModule.forRoot(),
		DirectivesModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		WelcomePage,
		LoginPage,
		SignupPage,
		AboutPage,
		ThanksSignupPage,
		ProfilePage,
		CreateNewPage,
		MyNoticesPage,
		TabsPage,
		AllPage,
		YearPage,
		DepartmentPage,
		ClassPage,
		DetailsPage
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
		{ provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] },
		ProfileProvider,
		ProfileCaptureProvider,
		Camera,
		Crop,
		Transfer,
		UploadFilesProvider,
		SocialSharing,
		ImagePicker
	]
})
export class AppModule { }
