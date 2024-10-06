import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { NavbarCommonComponent } from '../navbar-common/navbar-common.component';
import { DvdRentalService } from '../dvd-rental.service';

@Component({
  selector: 'app-create-forms',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarCommonComponent],
  templateUrl: './create-forms.component.html',
  styleUrl: './create-forms.component.css'
})
export class CreateFormsComponent implements OnInit{
  myFilm: FormGroup;
  ratingOptions = [
    { value: '', label: 'Select a rating' },
    { value: 'PG', label: 'PG' },
    { value: 'R', label: 'R' },
    { value: 'G', label: 'G' },
    { value: 'PG-13', label: 'PG-13' },
    { value: 'NC-17', label: 'NC-17' }
  ];
  languagesList:any[]=[]
  flag:String='';


  constructor(private dvdService:DvdRentalService){
    this.myFilm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('',Validators.required),
      releaseYear: new FormControl('',[Validators.required, Validators.min(1)]),
      rentDuration: new FormControl(0, Validators.required),
      rentalRate: new FormControl(0,Validators.required),
      replacementCost: new FormControl(0, Validators.required),
      rating: new FormControl('', Validators.required),
      language: new FormControl('', Validators.required)
    })

  }
  ngOnInit():void{
    // console.log(this.myFilm.value)
    this.languagesList = this.dvdService.filmLanguages;
    let film=history.state.film;
    this.myFilm.controls['title'].setValue(film.title)
    this.myFilm.controls['description'].setValue(film.description)
    this.myFilm.controls['releaseYear'].setValue(film.release_year)
    this.myFilm.controls['rentDuration'].setValue(film.rental_duration)
    this.myFilm.controls['replacementCost'].setValue(film.replacement_cost)
    this.myFilm.controls['rating'].setValue(film.rating)
    this.myFilm.controls['language'].setValue(film.language)
    if(history.state.flag=='edit') this.flag='edit';
    else this.flag='add';
    
    
  }

  submitForm(){
    if(this.myFilm.valid){
      if(this.flag=='add'){
        this.dvdService.addfilm(this.myFilm.value).subscribe(
          (res:any)=>{
            if(res.message=='Success') alert("Film has been added successfully")
          },
          (err)=>{
            alert("Some error occured!!")
          }
        )
      }
      else if(this.flag=='edit'){
    this.dvdService.editfilms(this.myFilm.value).subscribe(
      (res:any)=>{
        if(res.status==200){
          alert('The fiml has been edited successfully')
        }
      },
      (err:any)=>{
        alert('Some Error Occurres. Please try after some time!')
      }
    )
      }
      
    }
    console.log(this.myFilm.value)
  }

}
