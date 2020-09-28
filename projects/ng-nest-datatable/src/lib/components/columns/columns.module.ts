import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableColumnHeaderDirective, DataTableColumnCellDirective } from '../../../public-api';
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
export class ColumnsModule {}
