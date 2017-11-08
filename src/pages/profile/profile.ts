import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { ProfileCaptureProvider } from '../../providers/profile-capture/profile-capture'
import { ProfileProvider } from '../../providers/profile/profile'
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
})
export class ProfilePage {
	showEdit: boolean;
	fields: fields = new fields;
	profilePic: string;
	stream: string = "btech";
	private profileForm: FormGroup;
	username: string;
	email: string;
	constructor(
		public navCtrl: NavController,
		public storage: Storage,
		public profile: ProfileCaptureProvider,
		public actionSheetCtrl: ActionSheetController,
		public platform: Platform,
		private formBuilder: FormBuilder,
		private profileInfo: ProfileProvider
	) {
		this.showEdit = true;
		this.storage.get('profilePicture')
			.then(res => {
				this.profilePic = res ? res : 'assets/img/placeholder.png';
			})
		this.profileForm = this.formBuilder.group({
			fullname: ['', [Validators.required, Validators.minLength(6)]],
			phone_no: ['', [Validators.required, Validators.minLength(10)]],
			roll_no: ['', [Validators.required, Validators.minLength(10)]],
			branch: ['', [Validators.required]],
			year: ['', [Validators.required]],
			username: [],
			email: []
		});
		this.profileInfo.getProfileInfo()
			.subscribe(res => {
				console.log(res)
				res = res[0]
				this.profileForm.setValue(
					{
						fullname: res.fullname,
						phone_no: res.phonenumber,
						roll_no: res.roll_no ? res.roll_no : '140180101051',
						branch: res.branch ? res.branch : 'cse',
						year: res.year ? res.year : '2014',
						username: this.username,
						email: this.email
					}
				);
			})
		this.profileForm.disable();
		this.storage.get('username')
			.then(res => {
				this.username = res;
			})
		this.storage.get('email')
			.then(res => {
				this.email = res;
			})
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}
	editFields() {
		this.showEdit = false;
		this.profileForm.enable();
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
							.then(res => this.profilePic = res);
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
	submitForm() {
		console.log(this.profileForm.value);
		this.profileInfo.postProfileInfo(this.profileForm.value)
			.subscribe(res => {
				console.log(res)
			})
	}
}
class fields {
	fullname: boolean = true;
	roll_no: boolean = true;
	branch: boolean = true;
	year: boolean = true;
	phone_no: boolean = true;
}
