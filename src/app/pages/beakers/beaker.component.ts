import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Beaker } from '../../@core/data/beaker';
import { Lab } from '../../@core/data/lab';
import { of } from 'rxjs';
import { CompoundService } from '../../@core/data/compound.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'chem-beaker',
  styleUrls: ['./beaker.component.scss'],
  templateUrl: './beaker.component.html',
})
export class BeakerComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private compoundService: CompoundService,
  ) {}

  protected lab?: Lab;
  protected beaker?: Beaker
  protected compounds: any[];

  ngOnInit() {
    this.lab = this.route.parent.parent.snapshot.data.lab;
    this.route.data.subscribe(data => {
      this.beaker = data.beaker
      this.compoundService.getCompounds(this.lab, data.beaker).subscribe(compounds => {
        this.compounds = compounds
      })
    })
  }

  onCompoundSave($event) {
    if ($event.error) throw $event.error
    const { _id, __version, ...destObject } = $event.result;
    const update = { $set: destObject }
    const compoundId = $event.result._id.toString();

    this.compoundService
      .updateCompound(this.lab, this.beaker, compoundId, update)
      .pipe(catchError(error => of($event.old)))
      .subscribe(compound => {
        this.compounds = this.compounds.map(data => {
          if (compound._id.equals(data._id)) {
            return compound
          }
          return data
        })
      });
  }
  onCompoundRemove(compound) {
    this.compoundService
      .deleteCompound(this.lab, this.beaker, compound._id.toString())
      .subscribe(deletedCompound => {
        this.compounds = this.compounds.filter(c => !c._id.equals(deletedCompound._id));
      }, error => {
        console.error(error)
      })
  }
}
