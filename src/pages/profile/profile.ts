import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, NavParams, AlertController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { ProfileCaptureProvider } from '../../providers/profile-capture/profile-capture';
import { ProfileProvider } from '../../providers/profile/profile';
import { UploadFilesProvider } from '../../providers/upload-files/upload-files';
import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints';
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
		private profileInfo: ProfileProvider,
		private navParams: NavParams,
		private uploadFile: UploadFilesProvider,
		public alertCtrl: AlertController,
		public events: Events,
		private api: ApiEndpointsProvider
	) {
		this.setDefault();
		this.profileForm = this.formBuilder.group({
			fullname: ['', [Validators.required, Validators.minLength(4)]],
			phone_no: ['', [Validators.required, Validators.minLength(10)]],
			roll_no: ['', [Validators.required, Validators.minLength(10)]],
			branch: ['', [Validators.required]],
			year: ['', [Validators.required]],
			username: [],
			email: []
		});
		this.profileForm.disable();
		if (this.navParams.data.setEdit == true) {
			this.editFields();
		}
		this.storage.get('profileData')
			.then(res => {
				if (res.id > 0) {
					this.setForm(res);
				} else {
					this.getProfile();
				}
			})
	}
	setDefault() {
		this.storage.get('profileData')
			.then(res => {
				this.username = res.username;
				this.email = res.email;
				this.profilePic = this.api.getStaticMedia() + res.profile.image;

			})
		this.showEdit = true;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}
	editFields() {
		this.showEdit = false;
		this.profileForm.enable();
	}
	disableFields() {
		this.showEdit = true;
		this.profileForm.disable();
	}

	updateProfile() {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Select your choice',
			buttons: [
				{
					text: 'Camera',
					icon: !this.platform.is('ios') ? 'camera' : null,
					handler: () => {
						this.profile.getMedia('camera')
							.then(res => {
								this.profilePic = res;
								this.upload();
							});
					}
				}, {
					text: 'Album',
					icon: !this.platform.is('ios') ? 'albums' : null,
					handler: () => {
						this.profile.getMedia('album')
							.then(res => {
								this.profilePic = res;
								this.upload(res);
							});
					}
				}
			]
		});
		actionSheet.present();
	}
	submitForm() {
		console.log(this.profileForm.value);
		let year:string = this.profileForm.value.year;
		year = year.split('-')[0];
		this.profileForm.value.year = year;
		this.profileInfo.postProfileInfo(this.profileForm.value)
			.subscribe(res => {
				console.log(res);
				let alert = this.alertCtrl.create({
					title: 'Updated',
					subTitle: 'Your profile has been updated!',
					buttons: [{
						text: 'Ok',
						handler: data => {
							console.log('OK clicked');
							this.storage.set('profileData', res[0]);
							this.profileForm.reset();
							this.setForm(res[0]);
							this.disableFields();
							this.events.publish('user:login');
						}
					}]
				});
				alert.present();
			})
	}
	upload(imageData: any = this.profilePic) {
		this.uploadFile.uploadProfile(imageData);
	}
	getProfile() {
		this.profileInfo.getProfileInfo()
			.subscribe(res => {
				console.log(res)
				res = res[0]
				this.setForm(res);
				this.storage.set('profileData', res);
			})
	}
	setForm(res: any) {
		console.log('setform');
		console.log(res);
		let date = new Date;
		let year = date.toISOString();
		this.profileForm.setValue(
			{
				fullname: res.fullname,
				phone_no: res.phonenumber,
				roll_no: res.roll_no ? res.roll_no : '',
				branch: res.profile.branch ? res.profile.branch : '',
				year: res.profile.year ? res.profile.year.toString() : year,
				username: this.username,
				email: this.email
			}
		);
	}
}
class fields {
	fullname: boolean = true;
	roll_no: boolean = true;
	branch: boolean = true;
	year: boolean = true;
	phone_no: boolean = true;
}
