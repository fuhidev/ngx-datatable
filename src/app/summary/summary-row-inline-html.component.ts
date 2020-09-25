import { Component } from '@angular/core';
import { ColumnMode } from 'projects/ng-nest-datatable/src/public-api';

@Component({
  selector: 'summary-row-inline-html',
  template: `
    <div>
      <h3>
        Inline HTML template
        <small>
          <a
            href="https://github.com/ng-nest-datatable/blob/master/src/app/summary/summary-row-inline-html.component.ts"
          >
            Source
          </a>
        </small>
      </h3>
      <ngn-datatable
        class="material"
        [summaryRow]="enableSummary"
        [summaryPosition]="summaryPosition"
        [summaryHeight]="100"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        rowHeight="auto"
        [rows]="rows"
      >
        <ngn-datatable-column prop="name" [summaryTemplate]="nameSummaryCell"></ngn-datatable-column>
        <ngn-datatable-column name="Gender" [summaryFunc]="summaryForGender"></ngn-datatable-column>
        <ngn-datatable-column prop="age" [summaryFunc]="avgAge"></ngn-datatable-column>
      </ngn-datatable>
      <ng-template #nameSummaryCell>
        <div class="name-container">
          <div class="chip" *ngFor="let name of getNames()">
            <span class="chip-content">{{ name }}</span>
          </div>
        </div>
      </ng-template>
    </div>
  `
})
export class SummaryRowInlineHtmlComponent {
  rows = [];

  enableSummary = true;
  summaryPosition = 'top';

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

  getNames(): string[] {
    return this.rows.map(row => row.name).map(fullName => fullName.split(' ')[1]);
  }

  summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

  avgAge(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return filteredCells.reduce((sum, cell) => (sum += cell), 0) / filteredCells.length;
  }
}
