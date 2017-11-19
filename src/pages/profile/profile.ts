import { Component } from '@angular/core';
import { NavController, ActionSheetController, Platform, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

import { ProfileCaptureProvider } from '../../providers/profile-capture/profile-capture'
import { ProfileProvider } from '../../providers/profile/profile'
import { ApiEndpointsProvider } from '../../providers/api-endpoints/api-endpoints'
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
		private transfer: Transfer,
		private api: ApiEndpointsProvider
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
						branch: res.profile.branch ? res.profile.branch : 'cse',
						year: res.profile.year ? res.profile.year : '2014',
						username: this.username,
						email: this.email
					}
				);
			})
		this.profileForm.disable();
		if (this.navParams.data.setEdit == true) {
			this.profileForm.enable();
			this.showEdit = false;
		}
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
		this.profileInfo.postProfileInfo(this.profileForm.value)
			.subscribe(res => {
				console.log(res)
			})
	}
	upload(imageData: any = this.profilePic) {
		const fileTransfer: TransferObject = this.transfer.create();
		this.storage.get('token').then( token => {
			let options: FileUploadOptions = {
				fileKey: 'image',
				fileName: 'image.jpg',
				headers: {'Authorization':'jwt '+token}
			}
			console.log(imageData);
			console.log('imageData');
			console.log(this.api.getProfileAPI())
			fileTransfer.upload(imageData, this.api.getProfileAPI(), options)
				.then((data) => {
					console.log('success',data)
				}, (err) => {
					console.log("error" + JSON.stringify(err));
				});
		});
	}
}
class fields {
	fullname: boolean = true;
	roll_no: boolean = true;
	branch: boolean = true;
	year: boolean = true;
	phone_no: boolean = true;
}
