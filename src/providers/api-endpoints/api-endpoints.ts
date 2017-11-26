import { Injectable } from '@angular/core';
@Injectable()
export class ApiEndpointsProvider {
	private staticMedia: string = 'http://192.168.43.146:8000';
	private baseAPI: string = 'http://192.168.43.146:8000/api/v1/';
	private authLoginAPI: string = this.baseAPI + 'auth/login/';
	private authRegisterAPI: string = this.baseAPI + 'auth/register/';
	private allNoticesAPI: string = this.baseAPI + 'notices/';
	private profileAPI: string = this.baseAPI + 'auth/profile/';
	private noticeYear: string = this.allNoticesAPI + 'year/';
	private noticeDept: string = this.allNoticesAPI + 'branch/';
	private noticeClass: string = this.allNoticesAPI + 'branchyear/';
	private addNotices: string = this.baseAPI + 'addnotices/';
	private myNotices: string = this.allNoticesAPI + 'yournotices/';


	constructor() {
		console.log('Hello ApiEndpointsProvider Provider');
	}

	getStaticMedia(): string {
		return this.staticMedia;
	}

	getBaseAPI(): string {
		return this.baseAPI;
	}

	getAllNoticesAPI(): string {
		return this.allNoticesAPI;
	}

	getYearNoticesAPI(): string {
		return this.noticeYear;
	}

	getDeptNoticesAPI(): string {
		return this.noticeDept;
	}

	getClassNoticesAPI(): string {
		return this.noticeClass;
	}

	getAuthLoginAPI(): string {
		return this.authLoginAPI;
	}

	getAuthRegisterAPI(): string {
		return this.authRegisterAPI;
	}

	getProfileAPI(): string {
		return this.profileAPI;
	}

	getAddNoticesAPI(): string {
		return this.addNotices;
	}

	getMyNotices(): string {
		return this.myNotices;
	}
}
