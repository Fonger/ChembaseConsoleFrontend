import { Component, OnInit } from '@angular/core';
import { LabService } from '../../@core/data/lab.service';
import { EmailAuth, LdapAuth, Lab, LabUser } from '../../@core/data/lab';

import * as cloneDeep from 'clone-deep';
import { Deferred } from 'q';
import { DataSource } from 'ng2-smart-table/lib/data-source/data-source';
import { LabUserIdEditorComponent, LdapUserNameRenderComponent } from './lab-user-cell.component';

@Component({
  selector: 'chem-authentication',
  styleUrls: ['./authentication.component.scss'],
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent implements OnInit {
  constructor(private labService: LabService) {}
  protected emailAuth: EmailAuth
  protected ldapAuth: LdapAuth
  protected lab?: Lab
  protected labUsers: LabUser[] = []

  ngOnInit() {
    this.labService.onSelectedLab().subscribe(lab => {
      if (!lab) return
      this.lab = lab
      this.emailAuth = cloneDeep(lab.auth.email)
      this.ldapAuth = cloneDeep(lab.auth.ldap)
      this.labService.getLabUsers(lab).subscribe(labUsers => {
        this.labUsers = labUsers
      })
    });
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    // actions: { edit: false, add: false },
    columns: {
      _id: {
        title: 'ID',
        editable: false,
        type: 'string',
        editor: {
          type: 'custom',
          component: LabUserIdEditorComponent,
        },
      },
      method: {
        title: 'Auth Method',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'email', title: 'EMail' }, { value: 'ldap', title: 'LDAP' } ],
          },
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'email', title: 'EMail' },
              { value: 'ldap', title: 'LDAP' },
            ],
          },
        },
      },
      email: {
        title: 'Email',
      },
      verified: {
        title: 'Email Verified',
        type: 'boolean',
        editor: {
          type: 'checkbox',
          config: {
            true: true,
            false: false,
          },
        },
        filter: {
          type: 'list',
          config: {
            list: [{ value: true, title: 'Verified' }, { value: false, title: 'Not Verified' } ],
          },
        },
      },
      username: {
        title: 'Ldap User Name',
        type: 'custom',
        renderComponent: LdapUserNameRenderComponent,
      },
    },
  };
  onCreateUser(event: LabUserEvent) {
    if (event.newData.method === 'email') {
      const password = prompt('Please enter password for this user')
      if (!password) return event.confirm.reject(null)
      event.newData.password = password
    }
    this.labService.createLabUser(this.lab, event.newData).subscribe(
      data => {
        event.confirm.resolve(data)
      },
      error => {
        event.confirm.reject(null)
      },
    )
  }
  onDeleteUser(event: LabUserEvent) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.labService.deleteLabUser(this.lab, event.data).subscribe(
        value => {
          event.confirm.resolve()
        },
        error => {
          event.confirm.reject(null)
        },
      )
    } else {
      event.confirm.reject(null);
    }
  }
  onEditUser(event: LabUserEvent) {
    this.labService.updateLabUser(this.lab, event.newData).subscribe(
      data => {
        event.confirm.resolve(data)
      },
      error => {
        event.confirm.reject(undefined)
      },
    )
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

interface LabUserEvent {
  confirm: Deferred<LabUser>;
  data: LabUser;
  newData?: LabUser;
  source: DataSource
}
