import { Injectable } from '@angular/core';
@Injectable()
export class ApiEndpointsProvider {

	private baseAPI: string = 'http://localhost:8000/api/v1/';
	private authLoginAPI:string = this.baseAPI+'auth/login/';
	private authRegisterAPI:string = this.baseAPI+'auth/register/';
	private allNoticesAPI: string = this.baseAPI + 'notices/';
	private profileAPI: string = this.baseAPI + 'auth/profile/';
	private noticeYear: string = this.baseAPI + 'notices/year/';
	private noticeDept: string = this.baseAPI + 'notices/branch/';
	private noticeClass: string = this.baseAPI + 'notices/branchyear/';
	private addNotices: string = this.baseAPI + 'addnotices/';

	constructor() {
		console.log('Hello ApiEndpointsProvider Provider');
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
}
