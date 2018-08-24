import { Component, Input, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output, OnDestroy  } from '@angular/core';
import * as BSONEditor from 'bsoneditor';
import * as bson from 'bson';
import { BehaviorSubject, Subscription } from 'rxjs';
const BSON = new bson();

@Component({
  selector: 'chem-bson-editor',
  templateUrl: './bsoneditor.component.html',
  styleUrls: ['./bsoneditor.component.scss'],
})
export class BSONEditorComponent implements AfterViewInit, OnDestroy  {
  @ViewChild('bsoneditor')
  editorElement: ElementRef;

  editor: BSONEditor;
  private _data = new BehaviorSubject<any>(null);
  private subscription?: Subscription;

  @Input()
  set data(data: any) {
    this._data.next(data);
  }
  get data() {
    return this._data.value;
  }
  @Output() onSave = new EventEmitter<{error?: Error, result?: any, old?: any}>();
  @Output() onRemove = new EventEmitter<any>();

  ngAfterViewInit() {
    const options = {
      modes: ['view', 'tree', 'remove'],
      mode: 'view',
      name: 'Compound',
      navigationBar: false,
      bson: bson,
      onSave: (error, result) => {
        this.onSave.emit({ error, result, old: BSON.deserialize(BSON.serialize(this._data.value)) });
      },
      onRemove: (compound) => {
        this.onRemove.emit(compound);
      },
      onCancelEdit: () => {
        // return back original data
        return this._data.value;
      },
      onEditable: function (node) {
        if (node.path.length === 0) return false;
        if (node.path.length === 1 && node.field) {
          if (node.field === '__version' || node.field === '_id') {
            return false;
          }
        }
        return true;
      },
    };
    this.editor = new BSONEditor(this.editorElement.nativeElement, options);
    this.subscription = this._data.subscribe(data => {
      this.editor.set(data);
      this.editor.setName('Compound {' + data._id.toString() + '}');
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
