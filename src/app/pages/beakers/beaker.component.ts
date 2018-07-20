import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockdata } from './mockbeakerdata';

@Component({
  selector: 'chem-beaker',
  styleUrls: ['./beaker.component.scss'],
  templateUrl: './beaker.component.html',
})
export class BeakerComponent implements OnInit {
  beakerId: string
  mockdata: any[]
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.beakerId = this.route.snapshot.params.beakerId;
    this.mockdata = mockdata;
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
