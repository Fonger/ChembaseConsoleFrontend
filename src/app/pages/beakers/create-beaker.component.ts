import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BeakerService } from '../../@core/data/beaker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Lab } from '../../@core/data/lab';
import { LabService } from '../../@core/data/lab.service';

@Component({
  selector: 'chem-create-beaker',
  styleUrls: ['./create-beaker.component.scss'],
  templateUrl: './create-beaker.component.html',
})
export class CreateBeakerComponent implements OnInit {
  constructor(
    private labService: LabService,
    private beakerService: BeakerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  lab: Lab;

  ngOnInit() {
    this.lab = this.route.parent.snapshot.data.lab
  }

  onSubmit(form: NgForm) {
    const beakerData = {
      id: form.value.beakerId,
      description: form.value.beakerDesc,
    }
    this.beakerService.createBeaker(this.lab, beakerData).subscribe(beaker => {
      this.router.navigate([`/labs/${this.lab.id}/beakers/${beaker.id}/data`])
      this.lab.beakers.push(beaker)
      this.labService.setCurrentLab(this.lab)
    })
  }
}
