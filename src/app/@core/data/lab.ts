import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Beaker } from './beaker';

export class Lab {
  name: string;
  id: string;
  apiKey: string;
  description?: string;
  beakers: Beaker[];
  allowOrigins: string[];
  auth: {
    email: EmailAuth,
    ldap: LdapAuth,
  };

  constructor(private http: HttpClient) { }

  get(): Observable<Lab> {
    return this.http.get<Lab>(`http://localhost:8080/api/v1/admin/labs/${this.id}`)
  }
  getBeakers(): Observable<Beaker[]> {
    return this.http.get<Beaker[]>(`http://localhost:8080/api/v1/admin/labs/${this.id}/beakers`)
  }
  getBeaker(beakerId: string): Observable<Beaker> {
    return this.http.get<Beaker>(`http://localhost:8080/api/v1/admin/labs/${this.id}/beakers/${beakerId}`)
  }
}

export interface EmailAuth {
  enabled: boolean;
  verification: boolean;
  smtp?: {
    sender?: string,
    host?: string,
    port?: string,
    user?: string,
    pass?: string,
    secureMethod?: 'STARTTLS' | 'SSL',
    trustInvalidCertificate?: boolean,
  };
  template?: {
    verify: {
      subject: string
      content: string,
    },
    reset: {
      subject: string,
      content: string,
    },
  };
}
export interface LdapAuth {
  enabled: boolean;
  url?: string;
  searchBase?: string;
  searchFilter?: string;
  groupSearchBase?: string;
  groupSearchFilter?: string;
  trustInvalidCertificate?: string;
}