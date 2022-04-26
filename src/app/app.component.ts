import { Component } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { routes } from './app-routing.module';

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
  activeRoute: string = '';
  recheckIfInMenu: boolean = false;
  prevButtonTrigger: any

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let r = data?.state?.root?.firstChild?.firstChild ?? data?.state?.root?.firstChild
        this.activeRoute = r?.data['title'];
      }
    });
  }

  openResourceMenu(trigger: any): void {
    if (this.prevButtonTrigger) this.prevButtonTrigger.closeMenu();
    trigger.openMenu();
    this.prevButtonTrigger = trigger
  }

  closeResourceMenu(trigger: any): void {
    setTimeout(() => {
      if (this.recheckIfInMenu === false) {
        trigger.closeMenu();
      }
    }, 175);
  }

}