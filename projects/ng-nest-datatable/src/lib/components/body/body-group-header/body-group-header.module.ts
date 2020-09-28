import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatatableGroupHeaderTemplateDirective } from './body-group-header-template.directive';
import { DatatableGroupHeaderDirective } from './body-group-header.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DatatableGroupHeaderDirective, DatatableGroupHeaderTemplateDirective],
  exports: [DatatableGroupHeaderDirective, DatatableGroupHeaderTemplateDirective]
})
export class BodyGroupHeaderModule {}
