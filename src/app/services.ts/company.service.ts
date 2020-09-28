import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudBaseService } from 'nest-crud-typeorm-client';
import { CompanyEntity } from '../interfaces/company.interface';
@Injectable({ providedIn: 'root' })
export class CompanyService extends CrudBaseService<CompanyEntity> {
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
