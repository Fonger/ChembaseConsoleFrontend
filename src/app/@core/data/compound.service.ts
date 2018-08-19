

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lab } from './lab';
import { Beaker } from './beaker';
import { map } from 'rxjs/operators';
import * as EJSON from 'mongodb-extjson';

@Injectable()
export class CompoundService {
  constructor(private http: HttpClient) {}

  getCompounds(lab: Lab, beaker: Beaker): Observable<any[]> {
    return this.http
      .get<any>(`http://localhost:8080/api/v1/admin/labs/${lab.id}/beakers/${beaker.id}/compounds`)
      .pipe(map(data => EJSON.parse(data.compounds, { strict: false })))
  }

  updateCompound(lab: Lab, beaker: Beaker, compoundId: string, update: any): Observable<any> {
    update = { update: EJSON.stringify(update) };
    return this.http
      .patch<any>(`http://localhost:8080/api/v1/admin/labs/${lab.id}/beakers/${beaker.id}/compounds/${compoundId}`, update)
      .pipe(map(data => EJSON.parse(data.compound, { strict: false })))
  }

  deleteCompound(lab: Lab, beaker: Beaker, compoundId: string): Observable<any> {
    return this.http
      .delete<any>(`http://localhost:8080/api/v1/admin/labs/${lab.id}/beakers/${beaker.id}/compounds/${compoundId}`)
      .pipe(map(data => EJSON.parse(data.compound, { strict: false })))
  }
}
