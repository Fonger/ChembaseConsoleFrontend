
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lab } from './lab';
import { Beaker } from './beaker';
import { DeepPartial } from './lab.service';


@Injectable()
export class BeakerService {
  constructor(private http: HttpClient) {}
  private selectedBeaker = new BehaviorSubject<Beaker>(null);

  getBeakers(labId: string): Observable<DeepPartial<Beaker>[]> {
    return this.http.get<DeepPartial<Beaker>[]>(`http://localhost:8080/api/v1/admin/labs/${labId}`)
  }

  getBeaker(labId: string, beakerId: string): Observable<Beaker> {
    return this.http.get<Beaker>(`http://localhost:8080/api/v1/admin/labs/${labId}/beakers/${beakerId}`)
  }

  updateBeaker(labId: string, beakerId: string, content: DeepPartial<Beaker>): Observable<Beaker> {
    return this.http.patch<Beaker>(`http://localhost:8080/api/v1/admin/labs/${labId}/beakers/${beakerId}`, content)
  }
}
