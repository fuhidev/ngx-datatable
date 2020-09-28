import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarHelper } from './services/scrollbar-helper.service';
import { DimensionsHelper } from './services/dimensions-helper.service';
import { ColumnChangesService } from './services/column-changes.service';
import { DatatableModule } from './components/datatable.module';
import { DatatableColumnsModule } from './components/columns/columns.module';
import { BodyGroupHeaderModule } from './components/body/body-group-header/body-group-header.module';

@NgModule({
  imports: [CommonModule, DatatableModule, DatatableColumnsModule, BodyGroupHeaderModule],
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
  declarations: [],
  exports: [DatatableModule, DatatableColumnsModule, BodyGroupHeaderModule]
})
export class NgxDatatableModule {
  /**
   * Configure global configuration via INgxDatatableConfig
   * @param configuration
   */
  static forRoot(configuration: INgxDatatableConfig): ModuleWithProviders<NgxDatatableModule> {
    return {
      ngModule: NgxDatatableModule,
      providers: [{ provide: 'configuration', useValue: configuration }]
    };
  }
}

/**
 * Interface definition for INgxDatatableConfig global configuration
 */
export interface INgxDatatableConfig {
  messages: {
    emptyMessage: string; // Message to show when array is presented, but contains no values
    totalMessage: string; // Footer total message
    selectedMessage: string; // Footer selected message
  };
}
