import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportExcelDirective } from './export-excel.directive';
import { ExportExcelColumnDirective } from './export-excel-column.directive';

@NgModule({
  declarations: [ExportExcelDirective, ExportExcelColumnDirective],
  imports: [CommonModule],
  exports: [ExportExcelDirective, ExportExcelColumnDirective]
})
export class ExportExcelModule {}
