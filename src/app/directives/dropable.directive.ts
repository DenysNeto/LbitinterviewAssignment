import { Directive, HostListener, ɵConsole } from '@angular/core';
import { SVGService } from '../services/svg.service';

@Directive({
  selector: '[appDroppable]'
})
export class DropableDirective {
  private draggingElement: any;

  constructor(private svgService: SVGService) {}

  @HostListener('drop', ['$event'])
  onDrop(event: any) {
    let dropzone = event.target.id == 'dropzone' ? event.target : event.target.parentNode ;    
    let droppedElementId = event.dataTransfer.getData('text');
    let type = event.dataTransfer.getData('type');
    let droppedElement = document.getElementById(droppedElementId) as any;
    let clone = droppedElement.cloneNode(true);
    clone.setAttribute('draggable', true);
    dropzone.appendChild(clone);
    let svgPoint = this.svgService.getSVGPoint(event, clone ,  type);
    this.setPosition(clone, { x: svgPoint.x, y: svgPoint.y });
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event : any): void {
    if (this.draggingElement) {
      let svgPoint = this.svgService.getSVGPoint(event, this.draggingElement ,  event.target.tagName);
      this.setPosition(this.draggingElement, { x: svgPoint.x, y: svgPoint.y  });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event : any): void {
    if (event.target.getAttribute('draggable')) {
      this.draggingElement = event.target;
    }
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event : any): void {
    this.draggingElement = null;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event : any): void {
    this.draggingElement = null;
  }

  private setPosition(element : Element, coord: any , ) {
    element.setAttribute('cx', coord.x);
    element.setAttribute('cy', coord.y);
    element.setAttribute('x', coord.x);
    element.setAttribute('y', coord.y);
  }
}

