import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgnDatatableModule } from '../../projects/ng-nest-datatable/src/public-api';
import { AppComponent } from './app.component';

// -- Summary row
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BasicComponent } from './basic/basic.component';
import { PagingComponent } from './basic/paging.component';
import { EditingModule } from './editing/editing.module';
import { BulkModule } from './bulk/bulk.module';

@NgModule({
  declarations: [AppComponent, BasicComponent, PagingComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EditingModule,
    BulkModule,
    NgnDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
