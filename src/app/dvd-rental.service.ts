import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DvdRentalService {
private apiUrl='http://localhost:3000/'
filmLanguages:any[]=[]
errorMessage:String=''
  constructor(private http:HttpClient) { 
    this.getLanguages();
  }

 getFims():Observable<any>{
    return this.http.get(this.apiUrl+'getFilms')
  }
  editfilms(film:any){
    console.log(film)
    return this.http.put(this.apiUrl+'editFilm', film, {
      headers: { 'Content-Type': 'application/json' }
  })}
  deleteFim(film_id:number){
    return this.http.delete(this.apiUrl+'deleteFilm/'+film_id)
  }
  addfilm(film:any){
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl+'addFilm',film, {headers})
  }
  getLanguages(){
   this.http.get(this.apiUrl+'languages').subscribe(
    (res:any)=>{
      this.filmLanguages=res.data
      return {
        'status':'success',
        'data':this.filmLanguages
      }
    },
    (err:any)=>{
      this.errorMessage='Could not get languages';
      return {
        'status':'error',
        'message':this.errorMessage,
        'data':null
      }
    }
   )
  }


}
