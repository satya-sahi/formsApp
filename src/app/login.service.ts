import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(name:String,password:String){
    if(name=='admin' && password=='admin@123'){
      return 'Login Successfull';
    }
    else{
      return 'Please check your email or password';
    }
  }
  forgotPassword(){
    return 'Your reset password has been set successfully';
  }
}
