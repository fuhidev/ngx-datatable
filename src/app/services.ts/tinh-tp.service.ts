import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudBaseService } from 'nest-crud-typeorm-client';
import { TinhTPEntity } from '../interfaces/hanh-chinh.interface';
@Injectable({ providedIn: 'root' })
export class TinhTPService extends CrudBaseService<TinhTPEntity> {
  constructor(http: HttpClient) {
    super(
      {
        apiUrl: 'http://171.244.32.245:88',
        entity: 'rest/hanh-chinh-tinh'
      },
      http
    );
  }
}
