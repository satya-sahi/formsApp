import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
   
   username:String=''
   password:String=''
   logindisables=true;
   message='';
   response=''

  constructor(private loginService:LoginService, private router:Router){

  }

  ngOnInit(): void {
  }

  submit(){
    if(this.username && this.password) this.logindisables=false;
  }

  login(){
    this.message=this.loginService.login(this.username,this.password)
    this.logindisables=true;
    if(this.message=='Login Successfull'){
      this.message="Your login has been successful";
      this.response='success';
      this.router.navigate(['/home'])
    }
    else if(this.message=='Please check your email or password'){
      this.response='danger'
      this.message='Login Unsuccessful. Please check your email or password';
    }
    else{
      this.response='danger';
      this.message='Some error occured. Please try after some time';
    }
  }

  forgotPassword(){
    // this.loginService.forgotPassword(this.password)
    this.response='danger'
    this.message=this.loginService.forgotPassword()
  }

}
