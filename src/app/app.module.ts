import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AllNoticesProvider } from '../providers/all-notices/all-notices';
import { ApiEndpointsProvider } from '../providers/api-endpoints/api-endpoints';
import { LoginProvider } from '../providers/login/login';

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
	HttpModule
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	AllNoticesProvider,
    ApiEndpointsProvider,
    LoginProvider
  ]
})
export class AppModule {}
