import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockdata } from './mockbeakerdata';
import { BeakerService } from '../../@core/data/beaker.service';
import { LabService } from '../../@core/data/lab.service';
import { Beaker } from '../../@core/data/beaker';

@Component({
  selector: 'chem-beaker',
  styleUrls: ['./beaker.component.scss'],
  templateUrl: './beaker.component.html',
})
export class BeakerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private labService: LabService,
    private beakerService: BeakerService,
  ) {}

  private mockdata = []
  private beaker?: Beaker
  ngOnInit() {
    this.mockdata = mockdata
    const beakerId = this.route.snapshot.paramMap.get('beakerId')
    this.labService.onSelectedLab().subscribe(lab => {
      this.beakerService.getBeaker(lab.id, beakerId).subscribe(beaker => {
        this.beaker = beaker
      })
    })
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
