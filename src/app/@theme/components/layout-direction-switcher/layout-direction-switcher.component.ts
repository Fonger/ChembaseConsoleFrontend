import { Component, OnDestroy, Input } from '@angular/core';
import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators/takeWhile';

@Component({
  selector: 'chem-layout-direction-switcher',
  template: `
    <chem-switcher
      [firstValue]="directions.RTL"
      [secondValue]="directions.LTR"
      [firstValueLabel]="'RTL'"
      [secondValueLabel]="'LTR'"
      [value]="currentDirection"
      (valueChange)="toggleDirection($event)"
      [vertical]="vertical"
    >
    </chem-switcher>
  `,
})
export class LayoutDirectionSwitcherComponent implements OnDestroy {
  directions = NbLayoutDirection;
  currentDirection: NbLayoutDirection;
  alive = true;

  @Input() vertical: boolean = false;

  constructor(private directionService: NbLayoutDirectionService) {
    this.currentDirection = this.directionService.getDirection();

    this.directionService.onDirectionChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(newDirection => this.currentDirection = newDirection);
  }

  toggleDirection(newDirection) {
    this.directionService.setDirection(newDirection);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
