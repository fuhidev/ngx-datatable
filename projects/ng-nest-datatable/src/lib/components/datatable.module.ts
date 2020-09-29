import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BodyModule } from './body/body.module';
import { DatatableComponent } from './datatable.component';
import { DialogModule } from './dialog/dialog.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  imports: [CommonModule, HeaderModule, BodyModule, FooterModule, DialogModule, FormsModule],
  declarations: [DatatableComponent],
  exports: [DatatableComponent]
})
export class DatatableModule {}
