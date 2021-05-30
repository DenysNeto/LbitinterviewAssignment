import { Component, ElementRef, OnInit,  ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { SVGService } from 'src/app/services/svg.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-configuration-view',
  templateUrl: './configuration-view.component.html',
  styleUrls: ['./configuration-view.component.css']
})

export class ConfigurationViewComponent implements OnInit , AfterViewInit {

  svgId: string = "";
  
  @ViewChild('saveBtn', { read: ElementRef }) saveBtn: ElementRef | undefined;
  @ViewChild('resetBtn', { read: ElementRef }) resetBtn: ElementRef | undefined
  
  svg: HTMLElement | null = null;

  constructor( private route: ActivatedRoute , private svgService: SVGService , private httpService: HttpService , private router: Router ) { }

  ngOnInit(): void {
    if (!this.svgService.templates.length) {
      this.httpService.getTemplates().subscribe((_) => {
        this.buildSvg()
      });
    }
    else { 
      this.buildSvg();
    }    
  }

  ngAfterViewInit() { 
    let clicksSave = fromEvent(this.saveBtn?.nativeElement, 'click');
    let resultSave = clicksSave.pipe(debounceTime(300));
    resultSave.subscribe(() => this.save());
    let clicksReset = fromEvent(this.resetBtn?.nativeElement, 'click');
    let resultReset = clicksReset.pipe(debounceTime(100));
    resultReset.subscribe(() =>  this.resetTemplate() );
    this.svg =  document.getElementById("dropzone");
  }

  buildSvg() { 
    this.svgId = this.route.snapshot.paramMap.get("templateId") ?? "";
    const instance = this.svgService.getTemplateById(this.svgId);
    if (instance?.imgSource) { 
    let currentDropzoneSVG = atob((instance as any).imgSource.replace(/data:image\/svg\+xml;base64,/, ''));
    let cont = document.getElementById("dropzone-container");
    cont!.innerHTML = "";
    let newElement = document.createRange()
    .createContextualFragment(currentDropzoneSVG);
      cont?.appendChild(newElement);
    }
  }

  save() { 
    let { width, height } = this.svg!.getBoundingClientRect();
    this.svg?.setAttribute("viewBox", `0 0 ${width} ${height} `);
    let imgSource = this.svgService.serializeSVGAndGetImgSource(this.svg);
    this.svgService.updateTemplate({ id: this.svgId??"", imgSource });
    this.httpService.postTemplates({ id: this.svgId??"", imgSource });
  }

  resetTemplate() { 
    this.svg!.textContent = '';
    let { width, height } = this.svg!.getBoundingClientRect();
    this.svg?.setAttribute("viewBox", `0 0 ${width} ${height} `);
    let imgSource = this.svgService.serializeSVGAndGetImgSource(this.svg);
    this.svgService.updateTemplate({ id: this.svgId ?? "", imgSource  });
    this.httpService.postTemplates({ id: this.svgId??"", imgSource  });
  }

  back() { 
    this.router.navigate([``]);
  }

}
