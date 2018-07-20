import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'chem-pages',
  template: `
    <chem-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </chem-sample-layout>
  `,
})
export class PagesComponent {
  menu: NbMenuItem[]

  constructor() {
    this.menu = MENU_ITEMS;
  }
}
