import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableColumnCellDirective } from './column-cell.directive';
import { DataTableColumnHeaderDirective } from './column-header.directive';
import { DataTableColumnDirective } from './column.directive';
import { DataTableColumnCellTreeToggle } from './tree.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle
  ],
  exports: [
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle
  ]
})
export class DatatableColumnsModule {}
