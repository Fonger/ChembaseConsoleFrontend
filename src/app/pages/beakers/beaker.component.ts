import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockdata } from './mockbeakerdata';
import { BeakerService } from '../../@core/data/beaker.service';
import { LabService } from '../../@core/data/lab.service';
import { Beaker } from '../../@core/data/beaker';
import { Lab } from '../../@core/data/lab';
import { Subscription } from 'rxjs';

@Component({
  selector: 'chem-beaker',
  styleUrls: ['./beaker.component.scss'],
  templateUrl: './beaker.component.html',
})
export class BeakerComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private labService: LabService,
    private beakerService: BeakerService,
  ) {}
  protected beaker?: Beaker
  private mockdata = []

  lab?: Lab;
  subscription: Subscription;

  ngOnInit() {
    this.mockdata = mockdata
    const beakerId = this.route.snapshot.paramMap.get('beakerId')

    this.subscription = this.labService.getCurrentLab().subscribe(lab => {
      this.beakerService.getBeaker(lab, beakerId).subscribe(beaker => {
        this.beaker = beaker
      })
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onCompoundSave($event) {
    if ($event.error) throw $event.error
    setTimeout(() => {
      this.mockdata = this.mockdata.map(data => {
        if (data._id.equals($event.result._id)) {
          return data
        }
        return data
      })
    }, 1000)

  }
  onCompoundRemove(compound) {
    setTimeout(() => {
      this.mockdata = this.mockdata.filter(d => !d._id.equals(compound._id))
    }, 1000)
  }
}
