import { Component, OnDestroy } from '@angular/core'
import { NbThemeService } from '@nebular/theme'
import { takeWhile } from 'rxjs/operators/takeWhile'

// TODO: move layouts into the framework
@Component({
  selector: 'chem-three-columns-layout',
  styleUrls: ['./three-columns.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <chem-header></chem-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive >
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column class="small">
      </nb-layout-column>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-column class="small">
      </nb-layout-column>

      <nb-layout-footer fixed>
        <chem-footer></chem-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class ThreeColumnsLayoutComponent implements OnDestroy {

  private alive = true

  currentTheme: string

  constructor(protected themeService: NbThemeService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name
    })
  }

  ngOnDestroy() {
    this.alive = false
  }
}
