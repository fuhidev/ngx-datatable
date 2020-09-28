import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BodyModule } from './body/body.module';
import { DatatableComponent } from './datatable.component';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  imports: [CommonModule, HeaderModule, BodyModule, FooterModule],
  declarations: [DatatableComponent],
  exports: [DatatableComponent]
})
export class DatatableModule {}
