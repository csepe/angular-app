import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from './app-routing.module';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mapData: any;
  route: any;
  index: any;
  routes: any = routes;
  childRoute: any;
  activeRoute: string = routes[0].title;
  recheckIfInMenu: boolean = false;
  prevButtonTrigger: any;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    let currentUrl = this.location.path();
    if (currentUrl !== '/') {
      this.router.config.forEach((el: any) => {
        if (el.children) {
          el.children.forEach(child => {
            if ('/' + child.path == currentUrl) this.activeRoute = child.title
          })
        } else {
          if ('/' + el.path == currentUrl) this.activeRoute = el.title
        }
      })
    }
  }

  openResourceMenu(trigger) {
    if (this.prevButtonTrigger) this.prevButtonTrigger.closeMenu();
    trigger.openMenu();
    this.prevButtonTrigger = trigger
  }

  closeResourceMenu(trigger) {
    setTimeout(() => {
      if (this.recheckIfInMenu === false) {
        trigger.closeMenu();
      }
    }, 175);
  }

}