import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { DataTableColumnDirective } from '../../components/columns/column.directive';
import { TableColumn } from '../../types/table-column.type';

export interface IExcelColumn {
  merge?: number;
  hidden?: boolean;
  renderCell?: (column: TableColumn, value: any) => string;
}

@Directive({
  selector: '[exportExcelColumn]'
})
export class ExportExcelColumnDirective implements OnInit {
  @Input('exportExcelColumn') config?: IExcelColumn;
  @Input('excelRenderCell') renderCell: (column: TableColumn, value: any) => string;
  constructor(private ref: DataTableColumnDirective) {}

  ngOnInit() {
    Object.assign(this.ref, { excel: { renderCell: this.renderCell, ...this.config } });
  }
}
