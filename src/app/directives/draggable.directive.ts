import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor(private el: ElementRef) {
    this.el.nativeElement.setAttribute('draggable', true);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: any) {
    const elementToBeDragged = event.target.querySelector("[palleteItem]");
    event.dataTransfer.setData('text', elementToBeDragged.id);
    event.dataTransfer.setData('dropEffect', "copy");
    event.dataTransfer.setData('type', elementToBeDragged.tagName.toLowerCase());
  }

  @HostListener('document:dragover', ['$event'])
  onDragOver(event : any) {
      event.preventDefault();
  }

}
