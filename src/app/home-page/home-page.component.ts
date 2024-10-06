import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarCommonComponent } from '../navbar-common/navbar-common.component';
import { DvdRentalService } from '../dvd-rental.service';
import { HttpClientModule } from '@angular/common/http';





@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, NavbarCommonComponent, HttpClientModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {


  constructor(private router:Router, private dvdService: DvdRentalService){

  }
  films: any[]=[];
  paginatedFilms: any[]=[];
  currentPage =1;
  itemsPerPage=20;
  title = 'formsApp';
  rentedFilms: any[]=[];
  totalCost=0;
  isChecked:boolean=false
  ngOnInit(): void {
    this.getAllFims();
  }

  getAllFims(){
    this.dvdService.getFims().subscribe(
      (response: any)=>{
        if(response.message=='Success'){
          this.films=response.response;
          this.updatePaginatedFilms();
        }

      },
      (error:any)=>{
        console.log(error)
      }
    )
  }

  addFilm(film:any){
    this.rentedFilms.push(film)
    this.rentedFilms.forEach((x)=>this.totalCost+=Number(x.rental_rate))
    console.log(this.totalCost)
  }
  updatePaginatedFilms(){
    const startIndex = (this.currentPage-1)* this.itemsPerPage
    this.paginatedFilms = this.films.slice(startIndex, startIndex+this.itemsPerPage)
  }
  changePage(page:number){
    this.currentPage=page;
    this.updatePaginatedFilms();
  }
  CheckoutModal(){
    console.log(68)
  }
  editfilm(film:any){
    let flag='edit'
    this.router.navigate(['/edit-film'],{state:{film, flag}})
    
  }
  deletefilm(film:any){
  this.dvdService.deleteFim(film.film_id).subscribe(
    (res:any)=>{
      if(res.message=='Success'){
        alert(`The fiml ${res.name} has been deleted successfully!`)
      }
    },
    (err:any)=>{
      alert('Some Error Occurres. Please try after some time!')
    }
  )
  
  }

}
