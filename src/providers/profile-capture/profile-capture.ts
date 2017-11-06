import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera'
@Injectable()
export class ProfileCaptureProvider {

	public options: CameraOptions = {
		quality: 100,
		sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
		mediaType: this.camera.MediaType.ALLMEDIA,
		destinationType: this.camera.DestinationType.FILE_URI
	}

	constructor(
		public platform: Platform,
		private camera: Camera,
		private crop: Crop
	) { }

	// Return a promise to catch errors while loading image
	getMedia(): Promise<any> {
		// Get Image from ionic-native's built in camera plugin
		return this.camera.getPicture(this.options)
			.then((fileUri) => {
				// Crop Image, on android this returns something like, '/storage/emulated/0/Android/...'
				// Only giving an android example as ionic-native camera has built in cropping ability
				if (this.platform.is('ios')) {
					return fileUri
				} else if (this.platform.is('android')) {
					// Modify fileUri format, may not always be necessary
					fileUri = 'file://' + fileUri;

					/* Using cordova-plugin-crop starts here */
					return this.crop.crop(fileUri, { quality: 100 });
				}
			})
			.then((path) => {
				// path looks like 'file:///storage/emulated/0/Android/data/com.foo.bar/cache/1477008080626-cropped.jpg?1477008106566'
				console.log('Cropped Image Path!: ' + path);
				return path;
			})
	}

}
