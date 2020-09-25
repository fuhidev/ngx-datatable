import { Component } from '@angular/core';
import { ColumnMode } from 'projects/ng-nest-datatable/src/public-api';

@Component({
  selector: 'row-css-demo',
  template: `
    <div>
      <h3>
        Row/Header/Cell CSS Class Demo
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/basic/css.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngn-datatable
        class="material"
        [rows]="rows"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [rowHeight]="50"
        [rowClass]="getRowClass"
        [scrollbarV]="true"
      >
        <ngn-datatable-column name="Name"></ngn-datatable-column>
        <ngn-datatable-column name="Gender" headerClass="is-gender" [cellClass]="getCellClass"></ngn-datatable-column>
        <ngn-datatable-column name="Age"></ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class RowCssComponent {
  rows = [];
  expanded = {};
  timeout: any;

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      const rows = JSON.parse(req.response);
      cb(rows.splice(0, 50));
    };

    req.send();
  }

  getRowClass(row) {
    return {
      'age-is-ten': row.age % 10 === 0
    };
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-female': value === 'female'
    };
  }
}
