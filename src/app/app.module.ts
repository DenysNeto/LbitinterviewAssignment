import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutViewComponent } from './components/layout-view/layout-view.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';
import { PaletteComponent } from './components/palette/palette.component';
import { DraggableDirective } from './directives/draggable.directive';
import { DropableDirective } from './directives/dropable.directive';
import { SVGService } from './services/svg.service';
import {BrowserAnimationsModule} from    '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { ConfigurationViewComponent } from './components/configuration-view/configuration-view.component'; 
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { SafePipe } from './pipes/safe.pipe';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    LayoutViewComponent,
    PaletteComponent,
    DraggableDirective,
    DropableDirective,
    ConfigurationViewComponent,
    SafePipe,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatDividerModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FlexLayoutModule
   
    
  ],
  exports: [MatExpansionModule],
  providers: [SVGService],
  bootstrap: [AppComponent]
})
export class AppModule { }
