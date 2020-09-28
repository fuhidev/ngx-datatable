import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowEditComponent } from './row-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [RowEditComponent],
  exports: [RowEditComponent]
})
export class RowEditModule {}
