import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportExcelDirective } from './export-excel.directive';

@NgModule({
  declarations: [ExportExcelDirective],
  imports: [CommonModule],
  exports: [ExportExcelDirective]
})
export class ExportExcelModule {}
