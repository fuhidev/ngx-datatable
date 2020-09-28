import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CellEditComponent } from './cell-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CellEditComponent],
  imports: [CommonModule, FormsModule],
  exports: [CellEditComponent]
})
export class CellEditModule {}
