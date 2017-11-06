import { Injectable } from '@angular/core';
@Injectable()
export class ApiEndpointsProvider {

	private baseAPI:string = 'http://192.168.1.39:8000/api/v1/';
	private authLoginAPI:string = this.baseAPI+'auth/login/';
	private authRegisterAPI:string = this.baseAPI+'auth/register/';
	private allNoticesAPI:string = this.baseAPI+'notices/';
	constructor() {
		console.log('Hello ApiEndpointsProvider Provider');
	}

	getBaseAPI(): string {
		return this.baseAPI;
	}

	getAllNoticesAPI(): string {
		return this.allNoticesAPI;
	}

	getAuthLoginAPI(): string {
		return this.authLoginAPI;
	}

	getAuthRegisterAPI(): string {
		return this.authRegisterAPI;
	}

}
