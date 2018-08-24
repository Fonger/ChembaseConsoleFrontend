
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lab, LabUser, LabStats } from './lab';
import { environment } from '../../../environments/environment';

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]>; };

@Injectable()
export class LabService {
  constructor(private http: HttpClient) {}
  private labSubject = new ReplaySubject<Lab>(1);

  getLabs(): Observable<Partial<Lab>[]> {
    return this.http.get<Partial<Lab>[]>(`${environment.apiBaseUri}/api/v1/admin/labs`);
  }

  getLab(labId: string): Observable<Lab> {
    return this.http.get<Lab>(`${environment.apiBaseUri}/api/v1/admin/labs/${labId}`);
  }

  getCurrentLab(): Observable<Lab> {
    return this.labSubject.asObservable();
  }

  setCurrentLab(lab: Lab) {
    this.labSubject.next(lab);
  }

  updateLab(labId: string, content: DeepPartial<Lab>): Observable<Lab> {
    return this.http.patch<Lab>(`${environment.apiBaseUri}/api/v1/admin/labs/${labId}`, content);
  }

  getLabStats(lab: Lab): Observable<LabStats> {
    return this.http.get<LabStats>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/stats`);
  }

  getLabUsers(lab: Lab): Observable<LabUser[]> {
    return this.http.get<LabUser[]>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/users`);
  }

  createLabUser(lab: Lab, user: LabUser): Observable<LabUser> {
    return this.http.post<LabUser>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/users`, user);
  }

  updateLabUser(lab: Lab, user: Partial<LabUser>): Observable<LabUser> {
    return this.http.patch<LabUser>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/users/${user._id}`, user);
  }

  deleteLabUser(lab: Lab, user: LabUser): Observable<Partial<LabUser>> {
    return this.http.delete<Partial<LabUser>>(`${environment.apiBaseUri}/api/v1/admin/labs/${lab.id}/users/${user._id}`);
  }
}
