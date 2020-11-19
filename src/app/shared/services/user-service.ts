import { UserModel } from './../models/userModel';

import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";

@Injectable()
export class UsersListServiceProvider {
  public options: any;
  private baseURL = environment.baseURL;
  public userDetails: UserModel;
  public userInfo: UserModel;

  constructor(public http: HttpClient) {}
  /** to set details in model to move data b/w pages */
  setUserDetails(userDetails: UserModel)
  {
   this.userDetails=userDetails;
   console.log('inside setuser',this.userDetails);
  }
 /** to get details from model set in another page */
  getUserDetails(){
     console.log('inside getuser', this.userDetails)
    return this.userDetails;
  }

  processUserInfo(res) {
    console.log("process user info" + res)
    this.userInfo = res;
    return this.userInfo;
  }
   /** to add new  user  */
  createUserInfo(user): Observable<any> {
    // delete parts.partsRequestID;
    // parts.status="CREATED";
    return this.http.post<UserModel>(this.baseURL + "api/v1/users/register", user, this.options)
      .map(this. processUserInfo, this)
      .catch(this.handleError);
  }
  /** to get all the users List */
  getUsersList(): Observable<any> {
    return this.http
      .get<any>(this.baseURL + "api/v1/users", this.options)
      .map(res => res, err => err)
      .catch(this.handleError);
  }
  /** to edit user details */
  updateUserInfo(user): Observable<any> {
    console.log("user received",user)
          return this.http.put<UserModel>(this.baseURL + "api/v1/users", user, this.options)
      .map(this.processUserInfo, this)
      .catch(this.handleError);
  }
  /** to delete user details */
  deleteUserInfo(id,reason): Observable<any> {
    const requestPayload = {
      "statusReason": reason
    }
    return this.http.put<UserModel>(this.baseURL + "api/v1/users/"+id,requestPayload,this.options)
      .map(this. processUserInfo, this)
      .catch(this.handleError);
  }
  resetPasswordInfo(userId,newPassword): Observable<any>{
    const requestPayload={
      "_id":userId,
      "newPassword":newPassword
    }

return this.http.post<any>( this.baseURL+"api/v1/users/rstPwd",requestPayload,this.options)
.map(res =>res,err=>err)
.catch(this.handleError)
  }
  //Error Handling
  handleError(error: HttpErrorResponse) {
    let errorMsg = "";
    console.log(error);
    if (error.error && error.error.status === "Error") {
      errorMsg = error.error.message;
    } else {
      errorMsg = "API Server error. Please try again later.";
    }
    return Observable.throw(errorMsg);
  }
}
