import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../../services/sys/hero.service';
import { Hero } from '../../../hero';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  heroes: Hero[];
  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit() {
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    console.log("heroes="+this.heroes);
  }

}
