import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '../../../projects/ng-nest-datatable/src/public-api';
import { RowDeleteComponent } from './row-delete.component';
import { RowEditTemplateComponent } from './row-edit-template.component';
import { RowEditComponent } from './row-edit.component';

const components = [RowEditComponent, RowDeleteComponent, RowEditTemplateComponent];

@NgModule({
  imports: [CommonModule, NgxDatatableModule],
  declarations: [components],
  exports: [components]
})
export class EditingModule {}
