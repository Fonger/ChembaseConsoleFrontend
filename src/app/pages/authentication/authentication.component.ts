import { Component, OnInit } from '@angular/core';
import { LabService } from '../../@core/data/lab.service';
import { EmailAuth, LdapAuth, Lab } from '../../@core/data/lab';
import * as cloneDeep from 'clone-deep';

@Component({
  selector: 'chem-authentication',
  styleUrls: ['./authentication.component.scss'],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent implements OnInit {
  constructor(private labService: LabService) {}
  emailAuth: EmailAuth
  ldapAuth: LdapAuth
  private lab?: Lab

  ngOnInit() {
    this.labService.onSelectedLab().subscribe(lab => {
      if (!lab) return
      this.lab = lab
      this.emailAuth = cloneDeep(lab.auth.email)
      this.ldapAuth = cloneDeep(lab.auth.ldap)
    });
  }

  onSubmitEmail($event: Event) {
    $event.preventDefault()
    this.labService.updateLab(this.lab.id, {
      auth: {
        email: this.emailAuth,
      },
    }).subscribe(lab => {
      this.labService.refreshSelectedLab(lab)
    })
  }
  onSubmitLdap($event: Event) {
    $event.preventDefault()
    this.labService.updateLab(this.lab.id, {
      auth: {
        ldap: this.ldapAuth,
      },
    }).subscribe(lab => {
      this.labService.refreshSelectedLab(lab)
    })
  }
}
