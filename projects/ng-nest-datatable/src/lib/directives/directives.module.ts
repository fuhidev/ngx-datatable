import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { ExportExcelDirective } from './export-excel.directive';
import { LongPressDirective } from './long-press.directive';
import { OrderableDirective } from './orderable.directive';
import { ResizeableDirective } from './resizeable.directive';
import { VisibilityDirective } from './visibility.directive';
const directives = [
  DraggableDirective,
  LongPressDirective,
  OrderableDirective,
  ResizeableDirective,
  VisibilityDirective,
  ExportExcelDirective
];
@NgModule({
  imports: [CommonModule],
  declarations: directives,
  exports: directives
})
export class DatatableDirectivesModule {}
