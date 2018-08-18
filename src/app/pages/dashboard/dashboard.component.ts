import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Lab } from '../../@core/data/lab';
import { Subscription } from '../../../../node_modules/rxjs';
import { LabService } from '../../@core/data/lab.service';

@Component({
  selector: 'chem-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private labService: LabService) {}
  lab?: Lab;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.labService.getCurrentLab().subscribe(lab => {
      this.lab = lab
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
