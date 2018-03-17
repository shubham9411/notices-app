import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AllPage } from '../all/all';
import { YearPage } from '../year/year';
import { DepartmentPage } from '../department/department';
import { ClassPage } from '../class/class';
import { BackButtonProvider } from '../../providers/back-button/back-button';

@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html'
})
export class TabsPage {

	allRoot = AllPage
	yearRoot = YearPage
	departmentRoot = DepartmentPage
	classRoot = ClassPage


	constructor(
		public navCtrl: NavController,
		public backButton: BackButtonProvider
	) { }
	ionViewDidEnter() {
		this.backButton.publishOn();
	}
	ionViewWillLeave() {
		this.backButton.publishOff();
	}
}
