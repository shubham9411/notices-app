import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { Storage } from '@ionic/storage'
@Injectable()
export class ProfileCaptureProvider {

	public options: CameraOptions = {
		quality: 100,
		sourceType: this.camera.PictureSourceType.CAMERA,
		mediaType: this.camera.MediaType.PICTURE,
		destinationType: this.camera.DestinationType.FILE_URI
	}

	constructor(
		public platform: Platform,
		private camera: Camera,
		private crop: Crop,
		private storage: Storage
	) { }

	getMedia(source: string): Promise<any> {
		if (source == 'album') {
			this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
		}
		if (source == 'camera') {
			this.options.sourceType = this.camera.PictureSourceType.CAMERA;
		}
		return this.camera.getPicture(this.options)
			.then((fileUri) => {
				if (this.platform.is('ios')) {
					this.storage.set('profilePicture', fileUri);
					return fileUri;
				} else if (this.platform.is('android')) {
					fileUri = 'file://' + fileUri;
					this.storage.set('profilePicture', fileUri);
					return this.crop.crop(fileUri, { quality: 100 });
				}
			})
			.then((path) => {
				console.log('Cropped Image Path!: ' + path);
				return path;
			})
	}

}
