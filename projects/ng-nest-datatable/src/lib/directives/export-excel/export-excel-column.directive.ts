import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { DataTableColumnDirective } from '../../components/columns/column.directive';

export interface IExcelColumn {
  merge?: number;
  hidden: boolean;
}

@Directive({
  selector: '[exportExcelColumn]'
})
export class ExportExcelColumnDirective implements OnInit {
  @Input('exportExcelColumn') config?: IExcelColumn;
  constructor(private ref: DataTableColumnDirective) {}

  ngOnInit() {
    Object.assign(this.ref, { excel: this.config });
  }
}
