import { Component } from '@angular/core';
import { ColumnMode, DatatableService, TableColumn } from 'projects/ng-nest-datatable/src/public-api';
import { TinhTPEntity } from '../interfaces/hanh-chinh.interface';
import { TinhTPService } from '../services.ts/tinh-tp.service';

@Component({
  selector: 'basic',
  template: `
    <div>
      <h3>
        Fluid Row Heights
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/basic/basic-auto.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <button exportExcel [table]="table">Xuat Excel</button>
      <ngn-datatable
        #table
        class="material"
        [datatableService]="datatableService"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
      >
        <ngn-datatable-column
          [exportExcelColumn]="{ hidden: false }"
          [flexGrow]="2"
          prop="maTinhTP"
          name="Mã"
        ></ngn-datatable-column>
        <ngn-datatable-column
          [exportExcelColumn]="{ merge: 2 }"
          [excelRenderCell]="renderCell('hieu dep gai')"
          [flexGrow]="2"
          prop="tenTinhTP"
          name="Tên"
        ></ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class BasicComponent {
  alert = alert;
  datatableService: DatatableService<TinhTPEntity> = {
    service: this.service,
    primaryField: 'maTinhTP'
  };

  ColumnMode = ColumnMode;

  constructor(private service: TinhTPService) {}

  renderCell(name: string) {
    return (column: TableColumn, value) => {
      return value + ' ' + name;
    };
  }
}
