
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lab } from './lab';


@Injectable()
export class LabService {
  constructor(private http: HttpClient) {}
  public selectedLab = new BehaviorSubject<Lab>(null);

  getLabs(): Observable<Lab[]> {
    return this.http.get<Lab[]>('http://localhost:8080/api/v1/admin/labs')
  }

  getLab(labId: string): Observable<Lab> {
    return this.http.get<Lab>('http://localhost:8080/api/v1/admin/labs/' + labId)
  }

  setSelectedLab(lab: Lab): Promise<Lab> {
    return this.getLab(lab.id).toPromise().then(newLab => {
      this.selectedLab.next(newLab)
      return newLab
    })
  }

}
