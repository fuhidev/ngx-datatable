import { Component } from '@angular/core';
import { ColumnMode } from 'projects/ng-nest-datatable/src/public-api';

@Component({
  selector: 'column-pinning-demo',
  template: `
    <div>
      <h3>
        Column Pinning
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/columns/pinning.component.ts"
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
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
        [rows]="rows"
      >
        <ngn-datatable-column name="Name" [width]="300" [frozenLeft]="true"> </ngn-datatable-column>
        <ngn-datatable-column name="Gender"> </ngn-datatable-column>
        <ngn-datatable-column name="Age"> </ngn-datatable-column>
        <ngn-datatable-column name="City" [width]="150" prop="address.city"> </ngn-datatable-column>
        <ngn-datatable-column name="State" [width]="300" prop="address.state" [frozenRight]="true">
        </ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class ColumnPinningComponent {
  rows = [];

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
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
