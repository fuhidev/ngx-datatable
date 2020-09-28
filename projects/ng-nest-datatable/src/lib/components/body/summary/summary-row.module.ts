import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BodyRowModule } from '../body-row/body-row.module';
import { DataTableSummaryRowComponent } from './summary-row.component';

@NgModule({
  imports: [CommonModule, BodyRowModule],
  declarations: [DataTableSummaryRowComponent],
  exports: [DataTableSummaryRowComponent]
})
export class SummaryRowModule {}
