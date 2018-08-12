import { Component, OnInit } from '@angular/core';
import { LabService, DeepPartial } from '../../../@core/data/lab.service';
import { Lab } from '../../../@core/data/lab';

@Component({
  selector: 'chem-lab-switcher',
  templateUrl: './lab-switcher.component.html',
  styleUrls: ['./lab-switcher.component.scss'],
})
export class LabSwitcherComponent implements OnInit {
  constructor(private labService: LabService) {
    this.labs = []
  }

  labs: DeepPartial<Lab[]>;
  selectedLab?: Lab;

  ngOnInit() {
    this.labService.getLabs().subscribe(labs => {
      this.labs = labs;
      if (labs[0]) {
        this.selectLab(labs[0])
      }
    })
  }
  selectLab(lab) {
    this.labService.setSelectedLab(lab).then(newLab => this.selectedLab = newLab)
  }
}
