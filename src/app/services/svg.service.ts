import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Template } from '../interfaces/template';



@Injectable()
export class SVGService {

  private readonly _templates = new BehaviorSubject<Template[]>([]);
  readonly templates$ = this._templates.asObservable();

 
  
  get templates(): Template[] {
    return this._templates.getValue();
  }

  set templates(val: Template[]) {
    this._templates.next(val);
  }

  getTemplateById(id: string | null) : Template | undefined   { 
    return id ? this.templates.find(elem => elem.id == id) : undefined;
  }

  updateTemplate(newElem: Template) { 
    let index = this.templates.findIndex(elem => elem.id == newElem.id);
    this.templates[index] = { ...newElem };
    this.templates = [...this.templates];
  }


  serializeSVGAndGetImgSource(svg: HTMLElement | null): string { 
    let serializedSVG  = svg ?  (new XMLSerializer()).serializeToString(svg) : "";
    let encodedData = window.btoa(serializedSVG);
    let imgSource = `${encodedData}`;
    return imgSource;
  }


  getSVGPoint(event: any, element: any , type : string ): { x: string, y: string } {
    let point = element.viewportElement.createSVGPoint();
    let {  width, height } = element.getBoundingClientRect();
    point.x = (type!= "circle" &&  type!= "ellipse")  ?  ( event.clientX - width/2) : event.clientX ;
    point.y =  (type!= "circle" &&  type!= "ellipse") ? (event.clientY - height/2) : event.clientY;
    let CTM = element.viewportElement.getScreenCTM();
    let svgPoint = point.matrixTransform(CTM.inverse());
    return svgPoint;
  }

}
