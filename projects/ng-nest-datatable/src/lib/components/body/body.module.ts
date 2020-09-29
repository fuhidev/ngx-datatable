import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '../dialog/dialog.module';
import { DataTableRowWrapperComponent } from './body-row-wrapper.component';
import { BodyRowModule } from './body-row/body-row.module';
import { DataTableBodyComponent } from './body.component';
import { ProgressBarComponent } from './progress-bar.component';
import { ScrollerComponent } from './scroller.component';
import { DataTableSelectionComponent } from './selection.component';
import { SummaryRowModule } from './summary/summary-row.module';

@NgModule({
  imports: [CommonModule, BodyRowModule, SummaryRowModule, DialogModule],
  declarations: [
    DataTableBodyComponent,
    ProgressBarComponent,
    ScrollerComponent,
    DataTableSelectionComponent,
    DataTableRowWrapperComponent
  ],
  exports: [DataTableBodyComponent]
})
export class BodyModule {}
