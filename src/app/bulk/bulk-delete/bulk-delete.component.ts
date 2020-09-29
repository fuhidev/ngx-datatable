import { Component, OnInit } from '@angular/core';
import {
  ColumnMode,
  DatatableAction,
  DatatableBulkAction,
  DatatableService,
  SelectionType,
  TableColumn
} from '../../../../projects/ng-nest-datatable/src/public-api';
import { TinhTPEntity } from '../../interfaces/hanh-chinh.interface';
import { TinhTPService } from '../../services.ts/tinh-tp.service';

@Component({
  selector: 'app-bulk-delete',
  templateUrl: './bulk-delete.component.html',
  styleUrls: ['./bulk-delete.component.scss']
})
export class BulkDeleteComponent {
  datatableService: DatatableService<TinhTPEntity> = {
    service: this.service,
    primaryField: 'maTinhTP'
  };
  SelectionType = SelectionType;
  bulkActions: DatatableBulkAction<TinhTPEntity>[] = [{ name: 'delete', title: 'Xóa' }];
  actions: DatatableAction<TinhTPEntity>[] = [{ name: 'delete' }];

  columns: TableColumn[] = [
    { prop: 'maTinhTP', name: 'Mã' },
    { name: 'TenTinhTP', prop: 'tenTinhTP' }
  ];

  ColumnMode = ColumnMode;

  constructor(private service: TinhTPService) {}
}
