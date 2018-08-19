import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Beaker } from '../../@core/data/beaker';
import { Lab } from '../../@core/data/lab';

@Component({
  selector: 'chem-config-beaker',
  styleUrls: ['./config-beaker.component.scss'],
  templateUrl: './config-beaker.component.html',
})
export class ConfigBeakerComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  beaker: Beaker;
  lab: Lab;

  ngOnInit() {
    this.beaker = this.route.snapshot.data.beaker;
    this.lab = this.route.parent.parent.snapshot.data.lab;
  }
  onSubmit(form: NgForm) {
  }
}
