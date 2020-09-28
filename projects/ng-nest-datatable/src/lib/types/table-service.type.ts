import { CrudBaseService, RequestQueryBuilder } from 'nest-crud-typeorm-client';

export interface DatatableService<T> {
  /**
   * service restful của typeorm crud
   */
  service: CrudBaseService<T>;
  /**
   * builder trước khi request get dữ liệu
   */
  builder?: (rb: RequestQueryBuilder) => void;
  /**
   * khóa chính
   */
  primaryField: keyof T;
}
