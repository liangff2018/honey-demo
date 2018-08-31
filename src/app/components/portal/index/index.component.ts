import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { HeroService } from '../../../services/sys/hero.service';
import { Hero } from '../../../hero';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  heroes: Hero[];
  contentStyle: {};
  constructor(
    private el: ElementRef,
    private heroService: HeroService
  ) { }

  ngOnInit() {
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    console.log("heroes="+this.heroes);
  }

  /*监听窗口改变事件*/
  @HostListener("window:resize") onResize() {
    this.contentStyle = {
      "height": this.el.nativeElement.offsetParent.clientHeight-160+"px"
    };
  }

  @HostListener("window:load") onLoad() {
    this.contentStyle = {
      "height": this.el.nativeElement.offsetParent.clientHeight-160+"px"
    };
  }



}
