import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxDatatableModule } from '../../projects/ng-nest-datatable/src/public-api';
import { AppComponent } from './app.component';

// -- Summary row
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BasicComponent } from './basic/basic.component';
import { PagingComponent } from './basic/paging.component';
import { RowDeleteComponent } from './editing/row-delete.component';
import { RowEditComponent } from './editing/row-edit.component';

@NgModule({
  declarations: [AppComponent, BasicComponent, PagingComponent, RowDeleteComponent, RowEditComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule.forRoot({
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
