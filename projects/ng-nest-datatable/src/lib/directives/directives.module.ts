import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { LongPressDirective } from './long-press.directive';
import { OrderableDirective } from './orderable.directive';
import { ResizeableDirective } from './resizeable.directive';
import { VisibilityDirective } from './visibility.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DraggableDirective, LongPressDirective, OrderableDirective, ResizeableDirective, VisibilityDirective],
  exports: [DraggableDirective, LongPressDirective, OrderableDirective, ResizeableDirective, VisibilityDirective]
})
export class DatatableDirectivesModule {}
