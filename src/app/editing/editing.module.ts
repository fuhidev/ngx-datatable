import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgnDatatableModule } from '../../../projects/ng-nest-datatable/src/public-api';
import { RowDeleteComponent } from './row-delete.component';
import { RowEditTemplateComponent } from './row-edit-template.component';
import { RowEditComponent } from './row-edit.component';

const components = [RowEditComponent, RowDeleteComponent, RowEditTemplateComponent];

@NgModule({
  imports: [CommonModule, NgnDatatableModule, FormsModule],
  declarations: [components],
  exports: [components]
})
export class EditingModule {}
