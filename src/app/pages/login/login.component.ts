import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'app/shared/models/userModel';
import { AuthServiceProvider } from 'app/shared/services/authentication-service';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel;
  showCredentialsError: Boolean;
  constructor(private router: Router,
    private route: ActivatedRoute, public loginService: AuthServiceProvider) {
      this.user = UserModel.initialize();
    this.showCredentialsError = false;
     }

  ngOnInit() {
  }
  onCancel(){}
  onSubmit(){
    
    this.loginService.login(this.user).subscribe(res => {
     console.log(res.token)
      sessionStorage.setItem("token",res.token),
     this.loginService.hasDeletePermission();
   this.router.navigateByUrl('/userHome');
 }, err => {
   console.log(err);
   this.user = UserModel.initialize();
   this.showCredentialsError = true;
 })
  }

}
