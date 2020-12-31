import { Directive, HostListener, Input, Output, EventEmitter, ViewChildren } from '@angular/core';

import { RequestQueryBuilder } from 'nest-crud-typeorm-client';
import { DatatableComponent } from '../../components/datatable.component';
import { KeyValue, ExcelService } from '../../services/excel.service';
import { TableColumn } from '../../types/table-column.type';
import { ExportExcelColumnDirective, IExcelColumn } from './export-excel-column.directive';

@Directive({
  selector: '[exportExcel]'
})
export class ExportExcelDirective {
  @Input() table: DatatableComponent<any>;
  @Input() renderCell?: (prop: string, value: any) => { text: string };
  @Input() renderColumn?: (column: TableColumn) => KeyValue | null;
  @Output() excelClick = new EventEmitter<any>();
  @Output() excelSuccess = new EventEmitter();
  @Output() excelError = new EventEmitter();
  @Output() excelFinally = new EventEmitter();
  @ViewChildren(ExportExcelColumnDirective) t;
  constructor(private service: ExcelService) {}

  @HostListener('click', ['$event'])
  async handleClick(e) {
    this.excelClick.emit(e);
    try {
      if (this.table.datatableService && this.table.datatableService.service) {
        const service = this.table.datatableService.service;
        const qb = RequestQueryBuilder.create();
        this.table.datatableService && this.table.datatableService.builder && this.table.datatableService.builder(qb);
        const values: Array<any> = [];
        const firstRequest = await service.getPagination(1000, 1, qb).toPromise();
        firstRequest.data.forEach(v => values.push(v));
        if (firstRequest.pageCount > 1) {
          for (let page = 2; page <= firstRequest.pageCount; page++) {
            const res = await service.getPagination(firstRequest.count, page, qb).toPromise();
            res.data.forEach(v => values.push(v));
          }
        }
        const columns: Array<TableColumn> = [];
        this.table._internalColumns.forEach(column => {
          const excelColumn: IExcelColumn = (column as any).excel;
          if (excelColumn) {
            if (excelColumn.hidden) {
              return;
            }
          }
          columns.push(column);
        });
        const eValues: KeyValue[][] = [];
        values.forEach(cValue => {
          const eValue: KeyValue[] = [];

          columns.forEach(column => {
            const excelColumn: IExcelColumn = (column as any).excel;
            let v = this.get(cValue, column.prop, '');
            let text = v;
            if (excelColumn && excelColumn.renderCell) {
              text = excelColumn.renderCell(column, v);
            } else if (this.renderCell) {
              const re = this.renderCell(column.prop as string, v);
              text = re.text;
            }
            eValue.push({ key: column.prop as string, value: text });
          });
          eValues.push(eValue);
        });
        const excelColumns = columns.map(column => {
          const excelColumn: IExcelColumn = (column as any).excel;
          let merge: number;
          if (excelColumn) {
            if (excelColumn.hidden) {
              return;
            }
            merge = excelColumn.merge;
          }
          if (!merge) {
            merge = column.flexGrow;
          }
          return { key: column.prop, value: column.name, merge } as KeyValue;
        });
        this.service.export({ columns: excelColumns, values: eValues });
        this.excelSuccess.emit({ columns, values: eValues });
      }
    } catch (error) {
      this.excelError.emit(error);
    } finally {
      this.excelFinally.emit();
    }
  }
  get(obj, path, def) {
    var fullPath = path.replace(/\[/g, '.').replace(/]/g, '').split('.').filter(Boolean);

    return fullPath.every(everyFunc) ? obj : def;

    function everyFunc(step) {
      return !(step && (obj = obj[step]) === undefined);
    }
  }
}
