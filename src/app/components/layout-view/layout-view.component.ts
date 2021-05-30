import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Template } from 'src/app/interfaces/template';
import { SVGService } from 'src/app/services/svg.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.css']
})
  


export class LayoutViewComponent implements OnInit {
  templates: Template[] = [];
  //@ts-ignore
  constructor(public svgService: SVGService , private httpService: HttpService  , private router: Router ) { }

  ngOnInit(): void {
    if (!this.svgService.templates.length) { 
      this.httpService.getTemplates();
    }
  }

  open(id : string) { 
    this.router.navigate([`/edit/${id}`]);
  }

}
