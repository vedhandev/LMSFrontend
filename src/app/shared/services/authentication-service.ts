
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import decode from 'jwt-decode';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserModel } from '../models/userModel';

@Injectable()
export class AuthServiceProvider {
  public options: any;
  private baseURL = environment.baseURL;
  token: any;
  userInfo: UserModel;

  constructor(public http: HttpClient) {
    this.userInfo = UserModel.initialize();
  }

  login(user): Observable<any> {
    console.log(user)
    return this.http.post<UserModel>(this.baseURL + 'users/authenticate', user, this.options)
      .map(this.processUser, this)
    // .catch(this.handleError)
  }




  processUser(res) {
    console.log('Process User' + JSON.stringify(res))
    this.userInfo = res;
    return this.userInfo;
  }


  getToken() {
    return sessionStorage.getItem('token');
  }

  

  hasDeletePermission() {
    this.token= decode(sessionStorage.getItem('token'))
console.log(this.token)
    if (this.token != null && this.token.role === 'admin' ) {
      return true;
    } else {
      return false;
    }
  }

  // Error Handling
  handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    console.log(error);
    if (error.error && error.error.status === 'Error') {
      errorMsg = error.error.message;
    } else {
      errorMsg = 'API Server error. Please try again later.';
    }
    // return Observable.throw(errorMsg)
  }
}
