import {
  Component,
  Input,
  PipeTransform,
  HostBinding,
  ViewChild,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewContainerRef,
  OnDestroy,
  DoCheck,
  ChangeDetectionStrategy
} from '@angular/core';

import { TableColumn } from '../../types/table-column.type';
import { SortDirection } from '../../types/sort-direction.type';
import { Keys } from '../../utils/keys';
import { DatatableService } from '../../types/table-service.type';
import { DatatableAction, EventDeleteRow, EventQuickEditRow } from '../../types/table-row.type';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

export type TreeStatus = 'collapsed' | 'expanded' | 'loading' | 'disabled';

export type DatatableRow<T extends {}> = T & {
  ___isEdit?: boolean;
};

@Component({
  selector: 'datatable-body-cell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="datatable-body-cell-label" [style.margin-left.px]="calcLeftMargin(column, row)">
      <label
        *ngIf="column.checkboxable && (!displayCheck || displayCheck(row, column, value))"
        class="datatable-checkbox"
      >
        <input type="checkbox" [checked]="isSelected" (click)="onCheckboxChange($event)" />
      </label>
      <ng-container *ngIf="column.isTreeColumn">
        <button
          *ngIf="!column.treeToggleTemplate"
          class="datatable-tree-button"
          [disabled]="treeStatus === 'disabled'"
          (click)="onTreeAction()"
        >
          <span>
            <i *ngIf="treeStatus === 'loading'" class="icon datatable-icon-collapse"></i>
            <i *ngIf="treeStatus === 'collapsed'" class="icon datatable-icon-up"></i>
            <i *ngIf="treeStatus === 'expanded' || treeStatus === 'disabled'" class="icon datatable-icon-down"></i>
          </span>
        </button>
        <ng-template
          *ngIf="column.treeToggleTemplate"
          [ngTemplateOutlet]="column.treeToggleTemplate"
          [ngTemplateOutletContext]="{ cellContext: cellContext }"
        >
        </ng-template>
      </ng-container>

      <ng-container *ngIf="!column.cellTemplate">
        <ng-container *ngIf="isRowEdit(row); then editRow; else normalRow"> </ng-container>
        <ng-template #normalRow>
          <ng-container *ngIf="column.type !== 'date'; else typeDate">
            <span [innerHTML]="value" [title]="sanitizedValue"></span>
          </ng-container>
          <ng-template #typeDate>
            {{ value | date: 'dd/M/yy hh:mm:ss' }}
          </ng-template>
        </ng-template>
      </ng-container>
      <ng-template
        #cellTemplate
        *ngIf="column.cellTemplate"
        [ngTemplateOutlet]="column.cellTemplate"
        [ngTemplateOutletContext]="cellContext"
      >
      </ng-template>
      <ng-template #editRow>
        <datatable-row-edit [column]="column" [(value)]="quickEditRow[column.prop]"></datatable-row-edit>
      </ng-template>
      <div *ngIf="actions && actions.length && columnIndex === 0" class="action-column">
        <ng-container *ngIf="isRowEdit(row); then editRow; else normalRow"></ng-container>
        <ng-template #editRow>
          <i [title]="'Lưu'" (click)="saveEdit()" class="fas fa-check-circle">Lưu</i>
          <i [title]="'Hủy'" (click)="cancelEdit()" class="fas fa-times-circle">Hủy</i>
        </ng-template>
        <ng-template #normalRow>
          <ng-container *ngFor="let action of actions">
            <div
              *ngIf="action.name !== 'expand'"
              (click)="rowClick(action, row)"
              (focus)="action.focus && action.focus(row)"
              [innerHTML]="action.icon"
            ></div>
          </ng-container>
        </ng-template>
      </div>
    </div>
  `
})
export class DataTableBodyCellComponent<T> implements DoCheck, OnDestroy {
  @Input() displayCheck: (row: any, column?: TableColumn, value?: any) => boolean;

  @Input() set group(group: any) {
    this._group = group;
    this.cellContext.group = group;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get group() {
    return this._group;
  }

  @Input() set rowHeight(val: number) {
    this._rowHeight = val;
    this.cellContext.rowHeight = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get rowHeight() {
    return this._rowHeight;
  }

  @Input() set isSelected(val: boolean) {
    this._isSelected = val;
    this.cellContext.isSelected = val;
    this.cd.markForCheck();
  }

  get isSelected(): boolean {
    return this._isSelected;
  }

  @Input() set expanded(val: boolean) {
    this._expanded = val;
    this.cellContext.expanded = val;
    this.cd.markForCheck();
  }

  get expanded(): boolean {
    return this._expanded;
  }

  @Input() set rowIndex(val: number) {
    this._rowIndex = val;
    this.cellContext.rowIndex = val;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get rowIndex(): number {
    return this._rowIndex;
  }

  @Input() set column(column: TableColumn) {
    this._column = column;
    this.cellContext.column = column;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get column(): TableColumn {
    return this._column;
  }

  @Input() set row(row: any) {
    this._row = row;
    this.cellContext.row = row;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }

  get row(): any {
    return this._row;
  }

  @Input() set sorts(val: any[]) {
    this._sorts = val;
    this.calcSortDir = this.calcSortDir(val);
  }

  get sorts(): any[] {
    return this._sorts;
  }

  @Input() set treeStatus(status: TreeStatus) {
    if (status !== 'collapsed' && status !== 'expanded' && status !== 'loading' && status !== 'disabled') {
      this._treeStatus = 'collapsed';
    } else {
      this._treeStatus = status;
    }
    this.cellContext.treeStatus = this._treeStatus;
    this.checkValueUpdates();
    this.cd.markForCheck();
  }
  @Input() rows: Array<DatatableRow<T>>;
  @Input() datatableService: DatatableService<T>;
  @Output() delete = new EventEmitter<EventDeleteRow<T>>();
  @Output() quickEdit = new EventEmitter<EventQuickEditRow<T>>();
  @Input() columnIndex: number;
  get treeStatus(): TreeStatus {
    return this._treeStatus;
  }

  @Output() activate: EventEmitter<any> = new EventEmitter();

  @Output() treeAction: EventEmitter<any> = new EventEmitter();

  @ViewChild('cellTemplate', { read: ViewContainerRef, static: true })
  cellTemplate: ViewContainerRef;

  @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'datatable-body-cell';
    if (this.column.cellClass) {
      if (typeof this.column.cellClass === 'string') {
        cls += ' ' + this.column.cellClass;
      } else if (typeof this.column.cellClass === 'function') {
        const res = this.column.cellClass({
          row: this.row,
          group: this.group,
          column: this.column,
          value: this.value,
          rowHeight: this.rowHeight
        });

        if (typeof res === 'string') {
          cls += ' ' + res;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) {
              cls += ` ${k}`;
            }
          }
        }
      }
    }
    if (!this.sortDir) {
      cls += ' sort-active';
    }
    if (this.isFocused) {
      cls += ' active';
    }
    if (this.sortDir === SortDirection.asc) {
      cls += ' sort-asc';
    }
    if (this.sortDir === SortDirection.desc) {
      cls += ' sort-desc';
    }

    return cls;
  }

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  @HostBinding('style.minWidth.px')
  get minWidth(): number {
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number {
    return this.column.maxWidth;
  }

  @HostBinding('style.height')
  get height(): string | number {
    const height = this.rowHeight;
    if (isNaN(height)) {
      return height;
    }
    return height + 'px';
  }

  sanitizedValue: any;
  value: any = null;
  sortDir: SortDirection;
  isFocused = false;
  onCheckboxChangeFn = this.onCheckboxChange.bind(this);
  activateFn = this.activate.emit.bind(this.activate);

  cellContext: any = {
    onCheckboxChangeFn: this.onCheckboxChangeFn,
    activateFn: this.activateFn,
    row: this.row,
    group: this.group,
    value: this.value,
    column: this.column,
    rowHeight: this.rowHeight,
    isSelected: this.isSelected,
    rowIndex: this.rowIndex,
    treeStatus: this.treeStatus,
    onTreeAction: this.onTreeAction.bind(this)
  };

  private _isSelected: boolean;
  private _sorts: any[];
  private _column: TableColumn;
  private _row: any;
  private _group: any;
  private _rowHeight: number;
  private _rowIndex: number;
  private _expanded: boolean;
  private _element: any;
  private _treeStatus: TreeStatus;

  @Input() set actions(actions: DatatableAction<T>[]) {
    if (this.columnIndex !== 0) return;
    if (actions && actions.length) {
      actions.forEach(action => {
        if (action.name === 'quick-edit') {
          if (!action.icon) {
            action.icon = '<i class="fas fa-pen"></i>';
          }
          if (!action.tooltip) {
            action.tooltip = 'Chỉnh sửa nhanh';
          }
        }
        if (action.name === 'edit') {
          if (!action.icon) {
            action.icon = '<i class="fas fa-edit"></i>';
          }
          if (!action.tooltip) {
            action.tooltip = 'Chỉnh sửa';
          }
        } else if (action.name === 'delete') {
          if (!action.icon) {
            action.icon = '<i class="fas fa-trash-alt"></i>';
          }
          if (!action.tooltip) {
            action.tooltip = 'Xóa';
          }
        } else if (action.name === 'view') {
          if (!action.icon) {
            action.icon = '<i class="fas fa-eye"></i>';
          }
          if (!action.tooltip) {
            action.tooltip = 'Xem';
          }
        } else if (action.name === 'menu' && !action.icon) {
          action.icon = '<i class="fas fa-ellipsis-v"></i>';
        } else if (action.name === 'circle' && !action.icon) {
          action.icon = '<i class="far fa-dot-circle"></i>';
        }
      });
      // chỉ hiển thị 3 action
      // các action còn sẽ được hiển thị trong phần mở rộng
      // if (actions.length > 5) {
      //   this._lstExpandAction = actions.slice(4, actions.length);
      //   this._actions = [
      //     actions[0],
      //     actions[1],
      //     actions[2],
      //     actions[3],
      //     { name: 'expand', icon: '<i class="fas fa-ellipsis-v"></i>', tooltip: 'Khác' }
      //   ];
      // } else {
      this._actions = actions;
      // }
    }
  }
  get actions() {
    return this._actions;
  }
  /**
   * Danh sách thao tác
   */
  private _actions: DatatableAction<T>[] = [];
  /**
   * Thao tác mở rộng
   */
  _lstExpandAction: DatatableAction<T>[] = [];

  /**
   * Giữ giá trị khi người dùng nhấn action
   */
  private actionRow: any | null = null;

  /**
   * Lưu giá trị edit
   */
  private tempQuickEditRow: DatatableRow<T>;
  get quickEditRow() {
    return this.rows.find(f => f.___isEdit);
  }
  set quickEditRow(row: DatatableRow<T>) {
    if (this.quickEditRow) {
      this.quickEditRow.___isEdit = false;
    }
    // this.tempQuickEditRow = cloneDeep(row);
    this.tempQuickEditRow = { ...row };
    if (row) {
      row.___isEdit = true;
    }
  }
  isLoadingQuickEditRow = false;
  /**
   * Trạng thái xóa
   */
  isDelete = false;

  constructor(element: ElementRef, private cd: ChangeDetectorRef) {
    this._element = element.nativeElement;
  }

  ngDoCheck(): void {
    this.checkValueUpdates();
  }

  ngOnDestroy(): void {
    if (this.cellTemplate) {
      this.cellTemplate.clear();
    }
  }

  checkValueUpdates(): void {
    let value = '';

    if (!this.row || !this.column) {
      value = '';
    } else {
      const val = this.column.$$valueGetter(this.row, this.column.prop);
      const userPipe: PipeTransform = this.column.pipe;

      if (userPipe) {
        value = userPipe.transform(val);
      } else if (value !== undefined) {
        value = val;
      }
    }

    if (this.value !== value) {
      this.value = value;
      this.cellContext.value = value;
      this.sanitizedValue = value !== null && value !== undefined ? this.stripHtml(value) : value;
      this.cd.markForCheck();
    }
  }

  @HostListener('focus')
  onFocus(): void {
    this.isFocused = true;
  }

  @HostListener('blur')
  onBlur(): void {
    this.isFocused = false;
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.activate.emit({
      type: 'click',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element
    });
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(event: MouseEvent): void {
    this.activate.emit({
      type: 'dblclick',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element
    });
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetCell = event.target === this._element;

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if (isAction && isTargetCell) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row,
        group: this.group,
        rowHeight: this.rowHeight,
        column: this.column,
        value: this.value,
        cellElement: this._element
      });
    }
  }

  onCheckboxChange(event: any): void {
    this.activate.emit({
      type: 'checkbox',
      event,
      row: this.row,
      group: this.group,
      rowHeight: this.rowHeight,
      column: this.column,
      value: this.value,
      cellElement: this._element,
      treeStatus: 'collapsed'
    });
  }

  calcSortDir(sorts: any[]): any {
    if (!sorts) {
      return;
    }

    const sort = sorts.find((s: any) => {
      return s.prop === this.column.prop;
    });

    if (sort) {
      return sort.dir;
    }
  }

  stripHtml(html: string): string {
    if (!html.replace) {
      return html;
    }
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  }

  onTreeAction() {
    this.treeAction.emit(this.row);
  }

  calcLeftMargin(column: any, row: any) {
    const levelIndent = column.treeLevelIndent != null ? column.treeLevelIndent : 50;
    return column.isTreeColumn ? row.level * levelIndent : 0;
  }

  rowClick(action: DatatableAction<T>, row: DatatableRow<T>) {
    this.actionRow = row;
    if (action.name === 'delete') {
      this.isDelete = true;
    } else if (action.name === 'quick-edit') {
      // nếu là chỉnh sửa nhanh
      this.quickEditRow = row;
    } else if (action.link) {
      // this.router.navigate([action.link]);
    }
    action.click && action.click(row);
  }

  async deleteRow() {
    this.delete.emit({ type: 'before', row: this.actionRow });
    if (
      this.actionRow && // nếu có dữ liệu row
      this.datatableService &&
      this.datatableService.service &&
      this.datatableService.primaryField // nếu có khóa chính
    ) {
      // lấy dữ liệu dựa vào khóa chính
      const id = this.actionRow[this.datatableService.primaryField];
      // nếu có dữ liệu
      try {
        if (id !== null && id !== undefined) {
          await this.datatableService.service.delete(id).toPromise();
          this.actionRow = null;
          // this.toastrService.show(`Xóa thành công!`, `Thông Báo:`);
          this.isDelete = false;
          this.delete.emit({ type: 'after', row: this.actionRow });
        } else {
          throw new Error('Không xác định được khóa chính');
        }
      } catch (error) {
        this.quickEdit.emit({ type: 'after', error, row: this.actionRow });
        this.delete.emit({ type: 'after', error, row: this.actionRow });
        // this.toastrService.danger(error);
      }
    }
  }

  getRowPrimaryValue(row: DatatableRow<T>) {
    return row[this.datatableService.primaryField];
  }

  //#region Chỉnh sửa
  private subcriberEdit: Subscription;
  isRowEdit(row?: DatatableRow<T>) {
    return Boolean(row && row.___isEdit);
  }

  async saveEdit() {
    // nếu đang save thì bỏ qua
    if (this.isLoadingQuickEditRow) {
      return;
    }
    this.quickEdit.emit({ type: 'before', row: this.actionRow });
    this.isLoadingQuickEditRow = true;
    const key = this.getRowPrimaryValue(this.quickEditRow);
    this.subcriberEdit = this.datatableService.service
      .patch(key as any, this.quickEditRow)
      .pipe(
        finalize(() => {
          this.isLoadingQuickEditRow = false;
          delete this.subcriberEdit;
        })
      )
      .subscribe(
        result => {
          if (result) {
            // deep copy
            const oldRow = this.rows.find(f => this.getRowPrimaryValue(f) === key);
            if (oldRow) {
              Object.assign(oldRow, result);
            }

            this.quickEditRow = null;
            this.quickEdit.emit({ type: 'after', row: this.actionRow });
            // this.toastrService.success('Cập nhật thành công', 'Thành công');
          }
        },
        error => {
          this.quickEdit.emit({ type: 'after', error, row: this.actionRow });
          // this.toastrService.danger(error && error.messge, 'Lỗi');
        }
      );
  }

  cancelEdit() {
    // hủy cập nhật dữ liệu
    this.subcriberEdit && this.subcriberEdit.unsubscribe();
    delete this.subcriberEdit;
    Object.assign(this.quickEditRow, this.tempQuickEditRow);
    this.quickEditRow = null;
  }

  //#endregion
}
