import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Hero } from '../../hero';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient) { }


  getHeroes(): Observable<Hero[]> {
    //
    return this.http.get<Hero[]>("/organization/findAll.do");
  }
}
