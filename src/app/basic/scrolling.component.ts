import { Component } from '@angular/core';

@Component({
  selector: 'horz-vert-scrolling-demo',
  template: `
    <div>
      <h3>
        Horizontal and Vertical Scrolling
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/basic/scrolling.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngn-datatable
        class="material"
        [rows]="rows"
        columnMode="force"
        [headerHeight]="50"
        [footerHeight]="0"
        [rowHeight]="50"
        [scrollbarV]="true"
        [scrollbarH]="true"
      >
        <ngn-datatable-column name="Name" [width]="300"></ngn-datatable-column>
        <ngn-datatable-column name="Gender"></ngn-datatable-column>
        <ngn-datatable-column name="Age"></ngn-datatable-column>
        <ngn-datatable-column name="City" [width]="300" prop="address.city"></ngn-datatable-column>
        <ngn-datatable-column name="State" [width]="300" prop="address.state"></ngn-datatable-column>
      </ngn-datatable>
    </div>
  `
})
export class HorzVertScrolling {
  rows = [];

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
