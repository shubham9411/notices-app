import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

@Injectable()
export class AllNoticesProvider {
  data:any
  constructor() {
    console.log('Hello AllNoticesProvider Provider');
  }
  test():any{
    this.data = [{
      "id" : 1,
      "name" : "Testing",
      "desc" : "This is the description",
      "author" : "Admin",
      "valid_till" : "30-09-2017",
      "pub_date" : "22-09-2017"
    },
    {
      "id" : 2,
      "name" : "Testing 2",
      "desc" : "This is the description",
      "author" : "Admin",
      "valid_till" : "30-09-2017",
      "pub_date" : "28-09-2017"
    },
    {
      "id" : 3,
      "name" : "Testing 3",
      "desc" : "This is the description",
      "author" : "Admin",
      "valid_till" : "30-09-2017",
      "pub_date" : "12-09-2017"
    }]
    return this.data
  }
}
