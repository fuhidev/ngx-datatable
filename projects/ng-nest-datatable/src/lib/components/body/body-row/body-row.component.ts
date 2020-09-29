import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  Output,
  KeyValueDiffers,
  KeyValueDiffer,
  EventEmitter,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  DoCheck,
  SkipSelf
} from '@angular/core';

import { DatatableRow, TreeStatus } from '../body-cell/body-cell.component';
import { columnsByPin, columnGroupWidths, columnsByPinArr } from '../../../utils/column';
import { Keys } from '../../../utils/keys';
import { ScrollbarHelper } from '../../../services/scrollbar-helper.service';
import { translateXY } from '../../../utils/translate';
import { DatatableService } from '../../../types/table-service.type';
import { DatatableAction, EventDeleteRow, EventQuickEditRow } from '../../../types/table-row.type';
import { finalize } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'datatable-body-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './body-row.component.html',
  styleUrls: ['./body-row.component.scss']
})
export class DataTableBodyRowComponent<T> implements DoCheck {
  get isHover() {
    return this.row.___isHover;
  }
  @HostListener('mouseover') mouseover() {
    if (this.rows.some(s => s.___isHover)) {
      return;
    }
    this.row.___isHover = true;
  }
  @HostListener('mouseleave') mouseleave() {
    if (this.isRowEdit()) {
      return;
    }
    this.row.___isHover = false;
  }
  @Input() set actions(actions: DatatableAction<T>[]) {
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
  @Input() rows: Array<DatatableRow<T>>;
  @Input() datatableService: DatatableService<T>;
  @Output() delete = new EventEmitter<T>();
  @Output() quickEdit = new EventEmitter<EventQuickEditRow<T>>();
  @Input() set columns(val: any[]) {
    this._columns = val;
    this.recalculateColumns(val);
    this.buildStylesByGroup();
  }

  get columns(): any[] {
    return this._columns;
  }

  @Input() set innerWidth(val: number) {
    if (this._columns) {
      const colByPin = columnsByPin(this._columns);
      this._columnGroupWidths = columnGroupWidths(colByPin, this._columns);
    }

    this._innerWidth = val;
    this.recalculateColumns();
    this.buildStylesByGroup();
  }

  get innerWidth(): number {
    return this._innerWidth;
  }

  @Input() expanded: boolean;
  @Input() rowClass: any;
  @Input() row: DatatableRow<T>;
  @Input() group: any;
  @Input() isSelected: boolean;
  @Input() rowIndex: number;
  @Input() displayCheck: any;
  @Input() treeStatus: TreeStatus = 'collapsed';

  @Input()
  set offsetX(val: number) {
    this._offsetX = val;
    this.buildStylesByGroup();
  }
  get offsetX() {
    return this._offsetX;
  }

  @HostBinding('class')
  get cssClass() {
    let cls = 'datatable-body-row';
    if (this.isSelected) {
      cls += ' active';
    }
    if (this.rowIndex % 2 !== 0) {
      cls += ' datatable-row-odd';
    }
    if (this.rowIndex % 2 === 0) {
      cls += ' datatable-row-even';
    }

    if (this.rowClass) {
      const res = this.rowClass(this.row);
      if (typeof res === 'string') {
        cls += ` ${res}`;
      } else if (typeof res === 'object') {
        const keys = Object.keys(res);
        for (const k of keys) {
          if (res[k] === true) {
            cls += ` ${k}`;
          }
        }
      }
    }

    return cls;
  }

  @HostBinding('style.height.px')
  @Input()
  rowHeight: number;

  @HostBinding('style.width.px')
  get columnsTotalWidths(): string {
    return this._columnGroupWidths.total;
  }

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() treeAction: EventEmitter<any> = new EventEmitter();

  _element: any;
  _columnGroupWidths: any;
  _columnsByPin: any;
  _offsetX: number;
  _columns: any[];
  _innerWidth: number;
  _groupStyles: { [prop: string]: {} } = {
    left: {},
    center: {},
    right: {}
  };

  private _rowDiffer: KeyValueDiffer<{}, {}>;

  constructor(
    private differs: KeyValueDiffers,
    @SkipSelf() private scrollbarHelper: ScrollbarHelper,
    private cd: ChangeDetectorRef,
    element: ElementRef
  ) {
    this._element = element.nativeElement;
    this._rowDiffer = differs.find({}).create();
  }

  ngDoCheck(): void {
    if (this._rowDiffer.diff(this.row)) {
      this.cd.markForCheck();
    }
  }

  trackByGroups(index: number, colGroup: any): any {
    return colGroup.type;
  }

  columnTrackingFn(index: number, column: any): any {
    return column.$$id;
  }

  buildStylesByGroup() {
    this._groupStyles.left = this.calcStylesByGroup('left');
    this._groupStyles.center = this.calcStylesByGroup('center');
    this._groupStyles.right = this.calcStylesByGroup('right');
    this.cd.markForCheck();
  }

  calcStylesByGroup(group: string) {
    const widths = this._columnGroupWidths;
    const offsetX = this.offsetX;

    const styles = {
      width: `${widths[group]}px`
    };

    if (group === 'left') {
      translateXY(styles, offsetX, 0);
    } else if (group === 'right') {
      const bodyWidth = parseInt(this.innerWidth + '', 0);
      const totalDiff = widths.total - bodyWidth;
      const offsetDiff = totalDiff - offsetX;
      const offset = (offsetDiff + this.scrollbarHelper.width) * -1;
      translateXY(styles, offset, 0);
    }

    return styles;
  }

  onActivate(event: any, index: number): void {
    event.cellIndex = index;
    event.rowElement = this._element;
    this.activate.emit(event);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const isTargetRow = event.target === this._element;

    const isAction =
      keyCode === Keys.return ||
      keyCode === Keys.down ||
      keyCode === Keys.up ||
      keyCode === Keys.left ||
      keyCode === Keys.right;

    if (isAction && isTargetRow) {
      event.preventDefault();
      event.stopPropagation();

      this.activate.emit({
        type: 'keydown',
        event,
        row: this.row,
        rowElement: this._element
      });
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseenter(event: any): void {
    this.activate.emit({
      type: 'mouseenter',
      event,
      row: this.row,
      rowElement: this._element
    });
  }

  recalculateColumns(val: any[] = this.columns): void {
    this._columns = val;
    const colsByPin = columnsByPin(this._columns);
    this._columnsByPin = columnsByPinArr(this._columns);
    this._columnGroupWidths = columnGroupWidths(colsByPin, this._columns);
  }

  onTreeAction() {
    this.treeAction.emit();
  }

  rowClick(action: DatatableAction<T>, row: DatatableRow<T>) {
    this.actionRow = row;
    if (action.name === 'delete') {
      this.delete.emit(row);
    } else if (action.name === 'quick-edit') {
      // nếu là chỉnh sửa nhanh
      this.quickEditRow = row;
    } else if (action.link) {
      // this.router.navigate([action.link]);
    }
    action.click && action.click(row);
  }

  getRowPrimaryValue(row: DatatableRow<T>) {
    return row[this.datatableService.primaryField];
  }

  //#region Chỉnh sửa
  private subcriberEdit: Subscription;
  isRowEdit() {
    return Boolean(this.row && this.row.___isEdit);
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
            alert('Cập nhật thành công');
          }
        },
        error => {
          this.quickEdit.emit({ type: 'after', error, row: this.actionRow });
          alert(error && error.message);
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
