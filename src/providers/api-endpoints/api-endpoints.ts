import { Injectable } from '@angular/core';
@Injectable()
export class ApiEndpointsProvider {

	private baseAPI:string = 'http://127.0.0.1:8000/api/v1/';
	private authLoginAPI:string = this.baseAPI+'auth/login/';
	private authRegisterAPI:string = this.baseAPI+'auth/register/';
	constructor() {
		console.log('Hello ApiEndpointsProvider Provider');
	}

	getBaseAPI(): string {
		return this.baseAPI;
	}

	getAuthLoginAPI(): string {
		return this.authLoginAPI;
	}

	getAuthRegisterAPI(): string {
		return this.authRegisterAPI;
	}

}
