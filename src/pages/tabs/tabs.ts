import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AllPage } from '../all/all';
import { YearPage } from '../year/year';
import { DepartmentPage } from '../department/department';
import { ClassPage } from '../class/class';

@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html'
})
export class TabsPage {

	allRoot = AllPage
	yearRoot = YearPage
	departmentRoot = DepartmentPage
	classRoot = ClassPage


	constructor(public navCtrl: NavController) { }

}
