import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudBaseService } from 'nest-crud-typeorm-client';
import { QuanHuyenEntity } from '../interfaces/hanh-chinh.interface';
@Injectable({ providedIn: 'root' })
export class QuanHuyenService extends CrudBaseService<QuanHuyenEntity> {
  constructor(http: HttpClient) {
    super(
      {
        apiUrl: 'http://171.244.32.245:88',
        entity: 'rest/hanh-chinh-huyen'
      },
      http
    );
  }
}
