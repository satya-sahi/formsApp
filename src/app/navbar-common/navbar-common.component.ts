import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-common',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar-common.component.html',
  styleUrl: './navbar-common.component.css'
})
export class NavbarCommonComponent {

  constructor(private router:Router){

  }

  logout(){
    alert("You have been logged out sucessfully! Thank You");
    this.router.navigate(['/login'])
  }
}
