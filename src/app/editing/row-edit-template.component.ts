import { Component } from '@angular/core';
import { ColumnMode, DatatableAction, DatatableService, TableColumn } from 'projects/ng-nest-datatable/src/public-api';
import { TinhTPEntity } from '../interfaces/hanh-chinh.interface';
import { TinhTPService } from '../services.ts/tinh-tp.service';

@Component({
  selector: 'row-edit-template',
  template: `
    <div>
      <h3>
        Chỉnh dữ liệu của một hàng với template tùy chỉnh
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
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
      >
        <ngn-datatable-column name="Mã" prop="maTinhTP"> </ngn-datatable-column>
        <ngn-datatable-column name="Tên" prop="tenTinhTP" type="string">
          <ng-template ngn-datatable-cell-template let-isEdit="isEdit" let-value="value" let-rowEdit="rowEdit">
            <span *ngIf="!isEdit">{{ value }}</span>
            <input *ngIf="isEdit" [value]="rowEdit.tenTinhTP" (change)="rowEdit.tenTinhTP = $event.target.value" />
          </ng-template>
        </ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class RowEditTemplateComponent {
  datatableService: DatatableService<TinhTPEntity> = {
    service: this.service,
    primaryField: 'maTinhTP'
  };

  actions: DatatableAction<TinhTPEntity>[] = [{ name: 'quick-edit' }];

  ColumnMode = ColumnMode;

  constructor(private service: TinhTPService) {}
}
