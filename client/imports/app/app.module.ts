import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { LAYOUT_DECLARATIONS } from './layout';
import { DOMAINS_DECLARATIONS } from './domains';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    ...LAYOUT_DECLARATIONS,
    ...DOMAINS_DECLARATIONS
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
