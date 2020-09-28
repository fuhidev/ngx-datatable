import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BodyCellModule } from '../body-cell/body-cell.module';
import { DataTableBodyRowComponent } from './body-row.component';

@NgModule({
  declarations: [DataTableBodyRowComponent],
  imports: [CommonModule, BodyCellModule],
  exports: [DataTableBodyRowComponent]
})
export class BodyRowModule {}
