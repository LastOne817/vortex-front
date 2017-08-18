import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DAGService } from './dag.service';
import { DAGSelectorComponent } from './dag-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    DAGSelectorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    DAGService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
