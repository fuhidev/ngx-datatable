import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataTableFooterTemplateDirective } from './footer-template.directive';
import { DataTableFooterComponent } from './footer.component';
import { DatatableFooterDirective } from './footer.directive';
import { DataTablePagerComponent } from './pager.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DataTableFooterComponent,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DataTablePagerComponent
  ],
  exports: [
    DataTableFooterComponent,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DataTablePagerComponent
  ]
})
export class FooterModule {}
