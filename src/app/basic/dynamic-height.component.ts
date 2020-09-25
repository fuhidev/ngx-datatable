import { Component } from '@angular/core';
import { ColumnMode } from 'projects/ng-nest-datatable/src/public-api';

@Component({
  selector: 'dynamic-height-demo',
  template: `
    <div>
      <h3>
        Dynamic Height w/ Virtual Scrolling
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/basic/dynamic-height.component.ts"
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
        [footerHeight]="50"
        [rowHeight]="getRowHeight"
        [scrollbarV]="true"
      >
        <ngn-datatable-column name="Name"></ngn-datatable-column>
        <ngn-datatable-column name="Gender"></ngn-datatable-column>
        <ngn-datatable-column name="Row Height" prop="height"></ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class DynamicHeightComponent {
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
      const rows = JSON.parse(req.response).splice(0, 100);

      for (const row of rows) {
        row.height = Math.floor(Math.random() * 80) + 50;
      }

      cb(rows);
    };

    req.send();
  }

  getRowHeight(row) {
    console.log('ROW', row);
    if (!row) {
      return 50;
    }
    if (row.height === undefined) {
      return 50;
    }
    return row.height;
  }
}
