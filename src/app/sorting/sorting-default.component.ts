import { Component, OnInit } from '@angular/core';
import { ColumnMode } from 'projects/ng-nest-datatable/src/public-api';

@Component({
  selector: 'default-sorting-demo',
  template: `
    <div>
      <h3>
        Client-side Sorting
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/sorting/sorting-default.component.ts"
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
        [rowHeight]="50"
        [scrollbarV]="true"
        [sorts]="[{ prop: 'name', dir: 'desc' }]"
      >
        <ngn-datatable-column name="Company">
          <ng-template let-row="row" ngn-datatable-cell-template>
            {{ row.company }}
          </ng-template>
        </ngn-datatable-column>

        <ngn-datatable-column name="Name">
          <ng-template let-row="row" ngn-datatable-cell-template>
            {{ row.name }}
          </ng-template>
        </ngn-datatable-column>

        <ngn-datatable-column name="Gender"> </ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class DefaultSortingComponent implements OnInit {
  rows = [];

  ColumnMode = ColumnMode;

  ngOnInit() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }
}
