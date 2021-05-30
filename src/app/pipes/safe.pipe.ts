import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer,  SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safeResourceUrl'
})
export class SafePipe implements PipeTransform {
  defaultSvg = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdm…jQ0NDOyIgdmlld0JveD0iMCAwIDEzODYgNjk2Ljc1ICIvPg=="
	constructor(protected _sanitizer: DomSanitizer) {}

  public transform(value: string): SafeResourceUrl {
    try {
     return this._sanitizer.bypassSecurityTrustResourceUrl( `data:image/svg+xml;base64, ${value ?? this.defaultSvg}` )
    }
    catch (e) { 
      throw new Error("ERROR bypass security"  +  e);
    }
	}
}
