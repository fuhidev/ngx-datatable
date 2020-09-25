import { Component } from '@angular/core';
import { ColumnMode } from 'projects/ng-nest-datatable/src/public-api';

@Component({
  selector: 'column-flex-demo',
  template: `
    <div>
      <h3>
        Flex Column Width Distribution
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/columns/column-flex.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngn-datatable
        class="material"
        [columnMode]="ColumnMode.flex"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [rows]="rows"
      >
        <ngn-datatable-column name="Name" [flexGrow]="3">
          <ng-template let-value="value" ngn-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngn-datatable-column>
        <ngn-datatable-column name="Gender" [flexGrow]="1">
          <ng-template let-row="row" let-value="value" ngn-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngn-datatable-column>
        <ngn-datatable-column name="Age" [flexGrow]="1">
          <ng-template let-value="value" ngn-datatable-cell-template>
            {{ value }}
          </ng-template>
        </ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class ColumnFlexComponent {
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
