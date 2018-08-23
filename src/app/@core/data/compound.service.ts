

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lab } from './lab';
import { Beaker } from './beaker';
import { map } from 'rxjs/operators';
import * as EJSON from 'mongodb-extjson';
import { environment } from '../../../environments/environment';

@Injectable()
export class CompoundService {
  constructor(private http: HttpClient) {}

  getCompounds(lab: Lab, beaker: Beaker): Observable<any[]> {
    return this.http
      .get<any>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/beakers/${beaker.id}/compounds`)
      .pipe(map(data => EJSON.parse(data.compounds, { strict: false })))
  }

  createCompound(lab: Lab, beaker: Beaker, compound: any): Observable<any> {
    compound = { compound: EJSON.stringify(compound) };
    return this.http
      .post<any>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/beakers/${beaker.id}/compounds`, compound)
      .pipe(map(data => EJSON.parse(data.compound, { strict: false })))
  }

  updateCompound(lab: Lab, beaker: Beaker, compoundId: string, update: any): Observable<any> {
    update = { update: EJSON.stringify(update) };
    return this.http
      .patch<any>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/beakers/${beaker.id}/compounds/${compoundId}`, update)
      .pipe(map(data => EJSON.parse(data.compound, { strict: false })))
  }

  deleteCompound(lab: Lab, beaker: Beaker, compoundId: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/beakers/${beaker.id}/compounds/${compoundId}`)
      .pipe(map(data => EJSON.parse(data.compound, { strict: false })))
  }

  queryCompounds(lab: Lab, beaker: Beaker, conditions: string, options: string): Observable<any[]> {
    const body = { conditions, options }
    return this.http
      .post<any>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/beakers/${beaker.id}/compounds/query`, body)
      .pipe(map(data => EJSON.parse(data.compounds, { strict: false })))
  }
}
