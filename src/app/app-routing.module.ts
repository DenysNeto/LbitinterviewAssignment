import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationViewComponent } from './components/configuration-view/configuration-view.component';
import { LayoutViewComponent } from './components/layout-view/layout-view.component';

const routes: Routes = [
  {path: 'edit/:templateId', component: ConfigurationViewComponent},
      {path: '**', component: LayoutViewComponent},
  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
