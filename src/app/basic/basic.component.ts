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
      <ngn-datatable
        class="material"
        [datatableService]="datatableService"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
      >
      </ngn-datatable>
    </div>
  `
})
export class BasicComponent {
  datatableService: DatatableService<TinhTPEntity> = {
    service: this.service,
    primaryField: 'maTinhTP'
  };

  columns: TableColumn[] = [
    { prop: 'maTinhTP', name: 'Mã' },
    { name: 'TenTinhTP', prop: 'tenTinhTP' }
  ];

  ColumnMode = ColumnMode;

  constructor(private service: TinhTPService) {}
}
