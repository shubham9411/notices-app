import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ProfileCaptureProvider } from '../../providers/profile-capture/profile-capture'
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	fields: fields = new fields;
	profilePic: string;
	constructor(
		public navCtrl: NavController,
		public storage: Storage,
		public profile: ProfileCaptureProvider,
		public actionSheetCtrl: ActionSheetController,
		public platform: Platform
	) {
		this.storage.get('profilePicture')
			.then( res => {
				this.profilePic = res ? res : 'assets/img/placeholder.png';
			})
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
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
	updateProfile() {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Select',
			buttons: [
				{
					text: 'Camera',
					icon: !this.platform.is('ios') ? 'camera' : null,
					handler: () => {
						this.profile.getMedia('camera')
							.then( res => this.profilePic = res );
					}
				}, {
					text: 'Album',
					icon: !this.platform.is('ios') ? 'albums' : null,
					handler: () => {
						this.profile.getMedia('album')
							.then(res => this.profilePic = res);
					}
				}
			]
		});
		actionSheet.present();
	}
}
class fields {
	fullname: boolean = true;
	roll_no: boolean = true;
	branch: boolean = true;
	year: boolean = true;
	phone_no: boolean = true;
}
