import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BeakerService } from '../@core/data/beaker.service';
import { Lab } from '../@core/data/lab';
import { Beaker } from '../@core/data/beaker';

@Injectable()
export class BeakerResolver implements Resolve<Beaker> {
  constructor(private beakerService: BeakerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Beaker> {
    const beakerId = route.paramMap.get('beakerId');
    const lab: Lab = route.parent.data.lab;
    return this.beakerService.getBeaker(lab, beakerId).pipe(
      catchError(error => {
        this.router.navigate(['/labs/' + lab.id]);
        return of(null);
      }),
    );
  }
}
