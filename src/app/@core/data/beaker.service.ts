import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lab } from './lab';
import { Beaker } from './beaker';
import { DeepPartial } from './lab.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class BeakerService {
  constructor(private http: HttpClient) {}

  getBeakers(lab: Lab): Observable<DeepPartial<Beaker>[]> {
    return this.http.get<DeepPartial<Beaker>[]>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}`);
  }

  getBeaker(lab: Lab, beakerId: string): Observable<Beaker> {
    return this.http.get<Beaker>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/beakers/${beakerId}`);
  }

  createBeaker(lab: Lab, beaker: DeepPartial<Beaker>): Observable<Beaker> {
    return this.http.post<Beaker>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/beakers`, beaker);
  }

  updateBeaker(lab: Lab, beakerId: string, content: DeepPartial<Beaker>): Observable<Beaker> {
    return this.http.patch<Beaker>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/beakers/${beakerId}`, content);
  }
}
