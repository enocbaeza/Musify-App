import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [
    UserService
  ]
})
export class AppComponent implements OnInit {
  public title = 'Musify';
  public user: User;
  public identity;
  public token;
  public errorMessage;
  public warningMessage;

  constructor(
    private _userService: UserService
  ){
    this.user = new User('','','','', '', 'USER_ROLE','');
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public login(){
    this._userService.login(this.user).subscribe(response => {
      if(!response.user){
        this.warningMessage = response.message;
      } else{ 
        this.warningMessage = null;
        this.errorMessage = null;
        this.identity = response.user;
        localStorage.setItem('identity', JSON.stringify(this.identity));

        this._userService.login(this.user, true).subscribe(response => {
          this.token = response.token;

          if(this.token < 1){
            this.errorMessage = response.message;
          } else{
            localStorage.setItem('token', this.token);
          }
        }, error => {
          var errorMessage = <any> error;
    
          if(errorMessage){
            var body = JSON.parse(error._body);
            this.errorMessage = body.message;
            console.log(error);
          }
        });
      }
    }, error => {
      var errorMessage = <any> error;

      if(errorMessage){
        var body = JSON.parse(error._body);
        this.errorMessage = body.message;
        console.log(error);
      }
    });
  }

  public logOut(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
  }

}
