import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from '../../../../types/table-column.type';

@Component({
  selector: 'datatable-cell-edit',
  templateUrl: './cell-edit.component.html',
  styleUrls: ['./cell-edit.component.css']
})
export class CellEditComponent implements OnInit {
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
  constructor() {}

  ngOnInit(): void {}
}
