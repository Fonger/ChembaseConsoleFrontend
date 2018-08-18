import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LabService } from '../@core/data/lab.service';
import { Lab } from '../@core/data/lab';

@Injectable()
export class LabListResolver implements Resolve<Partial<Lab>[]> {
  constructor(private labService: LabService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Partial<Lab>[]> {
    return this.labService.getLabs().pipe(
      take(1),
      map(labs => {
        if (labs.length > 0) {
          return labs;
        } else {
          return null;
        }
      }),
    );
  }
}
