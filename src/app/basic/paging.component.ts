import { Component } from '@angular/core';
import { ColumnMode, DatatableService, TableColumn } from 'projects/ng-nest-datatable/src/public-api';
import { TinhTPEntity } from '../interfaces/hanh-chinh.interface';
import { TinhTPService } from '../services.ts/tinh-tp.service';

@Component({
  selector: 'paging',
  template: `
    <div>
      <h3>
        Phân trang
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/basic/basic-auto.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <p>Nếu muốn chỉnh giới hạn đối tượng của một trang thì set thuộc tính limit, mặc định limit = 10</p>
      <ngn-datatable
        class="material"
        [externalPaging]="true"
        [datatableService]="datatableService"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
      ></ngn-datatable>
      <ngn-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [limit]="10"
      >
      </ngn-datatable>
    </div>
  `
})
export class PagingComponent {
  rows = [
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' },
    { maTinhTP: '1', tenTinhTP: 'Đà Nẵng' }
  ];
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
