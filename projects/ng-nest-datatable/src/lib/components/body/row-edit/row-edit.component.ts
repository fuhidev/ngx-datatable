import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableColumn } from '../../../types/table-column.type';

@Component({
  selector: 'datatable-row-edit',
  templateUrl: './row-edit.component.html',
  styleUrls: ['./row-edit.component.scss']
})
export class RowEditComponent {
  @Input() column: TableColumn;
  private _value: any;
  @Input()
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = val;
    this.valueChange.emit(val);
  }

  @Output() valueChange = new EventEmitter();
}
