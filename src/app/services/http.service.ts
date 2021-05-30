import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Template } from '../interfaces/template';
import { SVGService } from './svg.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private  API_SERVER = "http://localhost:4201";

  constructor(private httpClient: HttpClient , private svgService : SVGService) { }

  public getTemplates() { 
    this.httpClient.get(`${this.API_SERVER}/templates`).subscribe((data: any) => {
      this.svgService.templates = data.templates;
    });
    
    return this.httpClient.get(`${this.API_SERVER}/templates`)
  }

  public postTemplates(obj : Template) {
    this.httpClient.post(`${this.API_SERVER}/templates`, {template : obj}).subscribe((data: any) => {
    });
  }

}
