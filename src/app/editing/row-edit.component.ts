import { Component } from '@angular/core';
import { ColumnMode, DatatableAction, DatatableService, TableColumn } from 'projects/ng-nest-datatable/src/public-api';
import { TinhTPEntity } from '../interfaces/hanh-chinh.interface';
import { TinhTPService } from '../services.ts/tinh-tp.service';

@Component({
  selector: 'row-edit',
  template: `
    <div>
      <h3>
        Chỉnh dữ liệu của một hàng
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
        [externalPaging]="true"
        [actions]="actions"
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
export class RowEditComponent {
  datatableService: DatatableService<TinhTPEntity> = {
    service: this.service,
    primaryField: 'maTinhTP'
  };

  actions: DatatableAction<TinhTPEntity>[] = [{ name: 'quick-edit' }];

  columns: TableColumn[] = [
    { prop: 'maTinhTP', name: 'Mã' },
    { name: 'TenTinhTP', prop: 'tenTinhTP', type: 'string' }
  ];

  ColumnMode = ColumnMode;

  constructor(private service: TinhTPService) {}
}
