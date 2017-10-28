import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { UtilityService } from './utility.service';

@Injectable()
export class UserService {

  private serverUrl = 'http://localhost:3000/';

  private userID: number;
  private userType: string;

  public profileUpdated: boolean;
  public loggedIn = false;

  public userDetails: any;

  public userLoaded = new BehaviorSubject<any>(null);

  constructor(
    private http: Http,
    private utilityService: UtilityService
  ) { 
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    if (localStorage.getItem('user_id') && localStorage.getItem('user_type')) {
      this.setUserDetails(parseInt(localStorage.getItem('user_id')),localStorage.getItem('user_type'));
    }
  }

  logout() {
    this.setUserID(null);
    this.setUserType(null);
    this.loggedIn = false;
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_type');
  }

  getUserType() {
    return this.userType;
  }

  getUserID() {
    return this.userID;
  }

  setUserType(type: string) {
    this.userType = type;
  }

  setUserID(id: number) {
    this.userID = id;
    this.loggedIn = true;
  }

  setUserDetails(id: number, type: string) {
    const data = {
      id: id,
      type: type
    }
    this.setUserID(data.id);
    this.setUserType(data.type);
    this.getUserDetails(data);
  }

  getUserDetails(data) {
    const specificUrl = this.serverUrl + 'user/get-user-details';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    let responseData =  this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError)
          .subscribe((response) => {
            console.log(response);
        if (response['_body'] == 'Failure') {
          alert('Unable to Get User Details');
        } else {
          let res = JSON.parse(response['_body']);
          console.log(res);
          this.userDetails = res.details[0];
          this.profileUpdated = res.profileUpdate;
          this.userLoaded.next(this.userDetails);

          localStorage.setItem('user_id', data.id);
          localStorage.setItem('user_type', data.type);
        }
      });
    
    return responseData;
  }

  saveProfile(data) {
    const specificUrl = this.serverUrl + 'user/update-user-details';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  createClassroom(data) {
    const specificUrl = this.serverUrl + 'user/create-classroom';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  searchClassroom(data) {
    const specificUrl = this.serverUrl + 'user/search-course-code';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

  joinClassroom(data) {
    const specificUrl = this.serverUrl + 'user/join-classroom';

    const headers = new Headers({'Content-Type' : 'application/json'});
    const options = new RequestOptions({headers: headers});

    return this.http.post(specificUrl, data, options)
          .map(this.utilityService.extractData)
          .catch(this.utilityService.handleError);
  }

}
