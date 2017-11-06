import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	fields: fields = new fields;
	profilePic: string = 'assets/img/placeholder.png';
	constructor(
		public navCtrl: NavController,
		public storage: Storage,
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}
	changeProfilePicture() {
		console.log('hi there he wants to change the PP or DP');
	}
	changePassword() {
		console.log('hi there he wants to change the password now');
	}
	goToSupport() {
		console.log('take him to support');
	}
	enableField(input: any, field: string) {
		this.fields[field] = false;
		setTimeout(() => {
			input.setFocus();
		}, 100);
	}
	disableField(field: string) {
		this.fields[field] = true;
	}
}
class fields {
	fullname: boolean = true;
	roll_no: boolean = true;
	branch: boolean = true;
	year: boolean = true;
	phone_no: boolean = true;
}
