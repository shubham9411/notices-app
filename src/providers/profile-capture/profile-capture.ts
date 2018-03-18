import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker';

@Injectable()
export class ProfileCaptureProvider {

	public options: CameraOptions = {
		quality: 50,
		sourceType: this.camera.PictureSourceType.CAMERA,
		mediaType: this.camera.MediaType.PICTURE,
		destinationType: this.camera.DestinationType.FILE_URI,

	}

	constructor(
		public platform: Platform,
		private camera: Camera,
		private crop: Crop,
		private storage: Storage,
		private imagePicker: ImagePicker
	) { }

	getMedia(source: string): Promise<any> {
		console.log(source)
		if (source === 'album') {
			console.log('yoyo album');
			return this.imagePicker.hasReadPermission()
				.then((permission) => {
					if (!permission) {
						this.requestReadPermission()
							.then(res => {
								console.log(res);
								return this.getFromGallery();
							})
							.catch(err => {
								console.log('error: ', err);
								return 'error';
							})
					} else {
						return this.getFromGallery();
					}
				})
				.catch(err=>{
					console.log('err : ',err);
				});

		} else if (source === 'camera') {
			console.log('yoyo camera')
			this.options.sourceType = this.camera.PictureSourceType.CAMERA;
			return this.camera.getPicture(this.options)
				.then((fileUri) => {
					if (this.platform.is('ios')) {
						return fileUri;
					} else if (this.platform.is('android')) {
						fileUri = 'file://' + fileUri;
						return this.crop.crop(fileUri, { quality: 50 })
							.catch((err) => {
								console.log('this is an error!1', err)
							});
					}
				})
				.catch((err) => {
					console.log('this is an error!1', err)
				})
				.then((path) => {
					this.storage.set('profilePicture', path);
					console.log('Cropped Image Path!: ' + path);
					return path;
				})
				.catch((err) => {
					console.log('this is an error!3', err)
				});
		}
	}
	requestReadPermission() {
		return this.imagePicker.requestReadPermission();
	}

	getFromGallery() {
		let options = {
			maximumImagesCount: 1,
			quality: 100,
			outputType: 0
		};
		return this.imagePicker.getPictures(options)
			.then(res => {
				let fileUri = res[0];
				if (this.platform.is('ios')) {
					return fileUri;
				} else if (this.platform.is('android')) {
					fileUri = 'file://' + fileUri;
					return this.crop.crop(fileUri, { quality: 50 })
						.catch((err) => {
							console.log('this is an error!1', err)
						});
				}
			})
			.catch((err) => {
				console.log('this is an error!1', err)
			})
			.then((path) => {
				this.storage.set('profilePicture', path);
				console.log('Cropped Image Path!: ' + path);
				return path;
			})
			.catch((err) => {
				console.log('this is an error!3', err)
			});
	}

}
