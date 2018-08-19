import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lab } from './lab';
import { Beaker } from './beaker';
import { DeepPartial } from './lab.service';


@Injectable()
export class BeakerService {
  constructor(private http: HttpClient) {}

  getBeakers(lab: Lab): Observable<DeepPartial<Beaker>[]> {
    return this.http.get<DeepPartial<Beaker>[]>(`http://localhost:8080/api/v1/admin/labs/${lab.id}`)
  }

  getBeaker(lab: Lab, beakerId: string): Observable<Beaker> {
    return this.http.get<Beaker>(`http://localhost:8080/api/v1/admin/labs/${lab.id}/beakers/${beakerId}`)
  }

  createBeaker(lab: Lab, beaker: DeepPartial<Beaker>): Observable<Beaker> {
    return this.http.post<Beaker>(`http://localhost:8080/api/v1/admin/labs/${lab.id}/beakers`, beaker)
  }

  updateBeaker(lab: Lab, beakerId: string, content: DeepPartial<Beaker>): Observable<Beaker> {
    return this.http.patch<Beaker>(`http://localhost:8080/api/v1/admin/labs/${lab.id}/beakers/${beakerId}`, content)
  }
}
