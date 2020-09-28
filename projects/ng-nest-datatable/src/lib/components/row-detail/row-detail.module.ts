import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatatableRowDetailTemplateDirective } from './row-detail-template.directive';
import { DatatableRowDetailDirective } from './row-detail.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DatatableRowDetailDirective, DatatableRowDetailTemplateDirective],
  exports: [DatatableRowDetailDirective, DatatableRowDetailTemplateDirective]
})
export class RowDetailModule {}
