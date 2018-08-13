import { Component, AfterViewInit, OnInit, Input } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { LabUser } from '../../@core/data/lab';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
  <div class="input-group input-group-fill-only">
    <input disabled class="form-control" [value]="cell.getValue()" placeholder="Auto Generatation">
  </div>
  `,
})
export class LabUserIdEditorComponent extends DefaultEditor {}

@Component({
  template: `
  <a href="#" *ngIf="showInfoBtn" (click)="showInfo($event)"><i class="nb-info"></i> {{ldapUserName}}</a>
  `,
})
export class LdapUserNameRenderComponent implements ViewCell, OnInit {
  ldapUserName: string;
  showInfoBtn: boolean;
  @Input() value: string;
  @Input() rowData: LabUser;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    this.ldapUserName = this.value.toString();
    this.showInfoBtn = this.value && this.ldapUserName !== ''
  }

  showInfo($event: Event) {
    event.preventDefault()
    const modalRef = this.modalService.open(LdapModalContentComponent, { size: 'lg', container: 'nb-layout' })
    modalRef.componentInstance.title = `LDAP User: ${this.ldapUserName}`;
    modalRef.componentInstance.value = this.rowData.info;
  }

}

@Component({
  selector: 'chem-ldap-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items">
          <td>
             {{ item.key }}
          </td>
          <td>
            <pre [ngClass]="item.class">{{ item.value | json }}</pre>
          </td>
        </tr>
      </tbody>
    </table>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-md btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
})
export class LdapModalContentComponent {
  items: any[] = []
  @Input() title: string

  @Input()
  set value(val: any) {
    this.items = Object.entries(val).map(entry => {
      return {
        key: entry[0],
        value: entry[1],
        class: typeof entry[1] === 'object' ? 'object' : 'non-object',
      }
    })
  }

  constructor(public activeModal: NgbActiveModal) {}
}
