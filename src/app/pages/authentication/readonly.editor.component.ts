import { Component } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';

@Component({
  template: '<div id="cell.getId()">{{cell.getValue()}}</div>',
})
export class ReadonlyEditorComponent extends DefaultEditor {}
