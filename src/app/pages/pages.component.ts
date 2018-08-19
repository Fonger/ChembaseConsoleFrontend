import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { DOCS_MENU_ITEMS } from './pages-docs-menu';
import { LabService } from '../@core/data/lab.service';
import { ActivatedRoute } from '@angular/router';
import { Lab } from '../@core/data/lab';

@Component({
  selector: 'chem-no-labs',
  template: `
  <chem-sample-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </chem-sample-layout>
  `,
})
export class NoLabComponent {
  menu: NbMenuItem[]
  labs?: Partial<Lab>[]

  constructor(private labService: LabService, private route: ActivatedRoute) {
    this.menu = DOCS_MENU_ITEMS;
  }

}

@Component({
  selector: 'chem-pages',
  template: `
    <chem-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </chem-sample-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[]
  labs?: Partial<Lab>[]
  beakerMenu: NbMenuItem

  constructor(private labService: LabService, private route: ActivatedRoute) {
    this.beakerMenu = {
      title: 'Beakers',
      icon: 'ion-beaker',
      children: [],
    },
    this.menu = [
      {
        title: 'Dashboard',
        icon: 'ion-home',
        link: 'dashboard',
        home: true,
      },
      {
        title: 'DEVELOPMENT',
        group: true,
      },
      this.beakerMenu,
      {
        title: 'Authentication',
        icon: 'ion-person-stalker',
        link: 'auth',
        hidden: true,
      },
      {
        title: 'Shell',
        icon: 'ion-ios-monitor',
        link: 'shell',
        hidden: true,
      },
      ...DOCS_MENU_ITEMS,
    ];
  }

  ngOnInit() {
    this.labService.getCurrentLab().subscribe(lab => {
      this.beakerMenu.children = lab.beakers.map(beaker => {
        return {
          title: beaker.id,
          link: `beakers/${beaker.id}`,
          children: [
            {
              title: 'Data',
              link: `beakers/${beaker.id}/data`,
            },
            {
              title: 'ACL Rule & Index',
              link: `beakers/${beaker.id}/config`,
            },
          ],
        }
      });
      this.beakerMenu.children.push({
        title: 'Create Beaker',
        link: 'createbeaker',
      });
      this.menu[3].hidden = false
      this.menu[4].hidden = false
    });
  }
}
