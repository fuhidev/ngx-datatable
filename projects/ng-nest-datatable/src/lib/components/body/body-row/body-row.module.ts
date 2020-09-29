import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatatableColumnsModule } from '../../columns/columns.module';
import { BodyCellModule } from '../body-cell/body-cell.module';
import { DataTableBodyRowComponent } from './body-row.component';

@NgModule({
  declarations: [DataTableBodyRowComponent],
  imports: [CommonModule, BodyCellModule, DatatableColumnsModule],
  exports: [DataTableBodyRowComponent]
})
export class BodyRowModule {}
