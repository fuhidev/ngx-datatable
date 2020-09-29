import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkDeleteComponent } from './bulk-delete/bulk-delete.component';
import { NgnDatatableModule } from '../../../projects/ng-nest-datatable/src/public-api';

@NgModule({
  declarations: [BulkDeleteComponent],
  imports: [CommonModule, NgnDatatableModule],
  exports: [BulkDeleteComponent]
})
export class BulkModule {}
