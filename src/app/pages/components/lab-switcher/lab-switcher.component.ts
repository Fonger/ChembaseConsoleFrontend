import { Component } from '@angular/core';

@Component({
  selector: 'chem-lab-switcher',
  templateUrl: './lab-switcher.component.html',
  styleUrls: ['./lab-switcher.component.scss'],
})
export class LabSwitcherComponent {
  labs = [{ id: 'lab1'}, { id: 'lab2'}, { id: 'lab3'}]
  selectedLab = this.labs[0]
  selectLab(lab) {
    this.selectedLab = lab
  }
}
