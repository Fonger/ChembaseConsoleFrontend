import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { MENU_ITEMS } from './pages-menu';
import { LabService } from '../@core/data/lab.service';

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

  constructor(private labService: LabService) {
    this.menu = MENU_ITEMS;
  }

  ngOnInit() {
    this.labService.selectedLab.subscribe(lab => {
      if (!lab) return
      this.menu[2].children = lab.beakers.map(beaker => {
        return {
          title: beaker.id,
          link: `/pages/beakers/${beaker.id}`,
          children: [
            {
              title: 'Data',
              link: `/pages/beakers/${beaker.id}/data`,
            },
            {
              title: 'ACL Rule & Index',
              link: `/pages/beakers/${beaker.id}/config`,
            },
          ],
        }
      });
      this.menu[2].children.push({
        title: 'Create Beaker',
        link: '/pages/createbeaker',
      });
      this.menu[3].hidden = false
      this.menu[4].hidden = false
    })
  }
}
