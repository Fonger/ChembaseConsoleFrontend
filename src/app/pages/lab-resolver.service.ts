import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, take, catchError, tap } from 'rxjs/operators';
import { LabService } from '../@core/data/lab.service';
import { Lab } from '../@core/data/lab';

@Injectable()
export class LabResolver implements Resolve<Lab> {
  constructor(private labService: LabService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lab> {
    const labId = route.paramMap.get('labId');

    return this.labService.getLab(labId).pipe(
      tap(lab => {
        this.labService.setCurrentLab(lab)
      }),
      catchError(error => {
        this.router.navigate(['/labs']);
        return of(null)
      }),
    );
  }
}
