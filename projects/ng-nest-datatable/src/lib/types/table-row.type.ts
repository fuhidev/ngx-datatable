export interface DatatableAction<T> {
  name: ('delete' | 'edit' | 'view') | string;
  tooltip?: string;
  icon?: string;
  hover?: (item: T) => void;
  click?: (item: T) => void;
  focus?: (item: T) => void;
  link?: Array<any> | string;
}

export interface DatatableBulkAction<T> {
  click?: () => void;
  name: string;
  title?: string;
}

export interface EventBulkClick<T> {
  action: DatatableBulkAction<T>;
}

export interface EventDeleteRow<T> {
  type: 'before' | 'after';
  error?: string;
  row: T;
}

export interface EventQuickEditRow<T> extends EventDeleteRow<T> {}
