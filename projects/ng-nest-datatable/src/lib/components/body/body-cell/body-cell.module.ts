import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableBodyCellComponent } from './body-cell.component';
import { CellEditModule } from './cell-edit/cell-edit.module';

@NgModule({
  declarations: [DataTableBodyCellComponent],
  imports: [CommonModule, CellEditModule],
  exports: [DataTableBodyCellComponent]
})
export class BodyCellModule {}
