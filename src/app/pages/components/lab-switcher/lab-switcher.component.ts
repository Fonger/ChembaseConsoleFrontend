import { Component, OnInit } from '@angular/core';
import { LabService } from '../../../@core/data/lab.service';
import { Lab } from '../../../@core/data/lab';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chem-lab-switcher',
  templateUrl: './lab-switcher.component.html',
  styleUrls: ['./lab-switcher.component.scss'],
})
export class LabSwitcherComponent implements OnInit {
  constructor(private labService: LabService, private route: ActivatedRoute) {
    this.labs = []
  }

  labs: Partial<Lab>[];
  lab?: Lab;

  ngOnInit() {
    this.route.data
      .subscribe((data: { labs?: Partial<Lab>[], lab?: Lab }) => {
        if (data.labs) this.labs = data.labs
        if (data.lab) this.lab = data.lab
      });
  }
}
