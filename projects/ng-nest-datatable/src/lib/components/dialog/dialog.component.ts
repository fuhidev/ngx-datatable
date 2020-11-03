import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { DialogService } from './dialog.service';

@Component({
  selector: 'datatable-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input() isOpen = false;
  @HostBinding('hidden') displayHidden() {
    return !this.isOpen;
  }
  private element: any;

  constructor(private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.element.remove();
  }
}
