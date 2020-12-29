import { Directive, HostListener, Input } from '@angular/core';

import { RequestQueryBuilder } from 'nest-crud-typeorm-client';
import { DatatableComponent } from '../../components/datatable.component';
import { KeyValue, ExcelService } from '../../services/excel.service';
import { TableColumn } from '../../types/table-column.type';

@Directive({
  selector: '[exportExcel]'
})
export class ExportExcelDirective {
  @Input() table: DatatableComponent<any>;
  @Input() renderCell?: (prop: string, value: any) => { text: string };
  @Input() renderColumn?: (column: TableColumn) => KeyValue | null;
  constructor(private service: ExcelService) {}

  @HostListener('click')
  async click() {
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
      const columns: KeyValue[] = this.table._internalColumns.map(
        column => ({ key: column.prop, value: column.name, merge: column.flexGrow } as KeyValue)
      );
      const eValues: KeyValue[][] = [];
      values.forEach(cValue => {
        const eValue: KeyValue[] = [];
        columns.forEach(column => {
          let v = this.get(cValue, column.key, '');
          let text = v;
          if (this.renderCell) {
            const re = this.renderCell(column.key, v);
            text = re.text;
          }
          eValue.push({ key: column.key, value: text });
        });
        eValues.push(eValue);
      });

      this.service.export({ columns, values: eValues });
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
