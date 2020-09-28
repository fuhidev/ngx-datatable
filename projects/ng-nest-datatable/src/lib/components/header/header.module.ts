import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatatableDirectivesModule } from '../../directives/directives.module';
import { DaatableBulkContentComponent } from './header-bulk-content.component';
import { DataTableHeaderCellComponent } from './header-cell.component';
import { DatatableTopbarComponent } from './header-topbar.component';
import { DataTableHeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, DatatableDirectivesModule],
  declarations: [
    DataTableHeaderComponent,
    DatatableTopbarComponent,
    DataTableHeaderCellComponent,
    DaatableBulkContentComponent
  ],
  exports: [
    DataTableHeaderComponent,
    DatatableTopbarComponent,
    DataTableHeaderCellComponent,
    DaatableBulkContentComponent
  ]
})
export class HeaderModule {}
