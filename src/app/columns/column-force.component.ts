import { Component } from '@angular/core';
import { ColumnMode } from 'projects/ng-nest-datatable/src/public-api';

@Component({
  selector: 'column-force-demo',
  template: `
    <div>
      <h3>
        Force Fill Column Width Distribution
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/columns/column-force.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngn-datatable
        class="material"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [rows]="rows"
      >
        <ngn-datatable-column name="Name" [width]="100">
          <ng-template let-value="value" ngn-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngn-datatable-column>
        <ngn-datatable-column name="Gender" [width]="100">
          <ng-template let-row="row" let-value="value" ngn-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngn-datatable-column>
        <ngn-datatable-column name="Age" [width]="300">
          <ng-template let-value="value" ngn-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class ColumnForceComponent {
  rows = [];

  ColumnMode = ColumnMode;

  constructor() {
    this.fetch(data => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
