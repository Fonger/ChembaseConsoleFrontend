import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Beaker } from '../../@core/data/beaker';
import { BeakerService } from '../../@core/data/beaker.service';
import { Lab } from '../../@core/data/lab';

@Component({
  selector: 'chem-config-beaker',
  styleUrls: ['./config-beaker.component.scss'],
  templateUrl: './config-beaker.component.html',
})
export class ConfigBeakerComponent implements OnInit {
  constructor(private route: ActivatedRoute, private beakerService: BeakerService) {}

  lab: Lab;
  beaker: Beaker;

  ngOnInit() {
    this.lab = this.route.parent.parent.snapshot.data.lab;
    this.route.data.subscribe(data => {
      this.beaker = data.beaker;
    })
  }
  onSubmit(form: NgForm) {
    this.beakerService.updateBeaker(this.lab, this.beaker.id, { rule: form.value }).subscribe(newBeaker => {
      this.beaker = newBeaker;
    }, error => {
      console.error(error);
    })
  }
}
