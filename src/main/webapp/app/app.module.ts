import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { JhipsterHelloWorld3SharedModule } from 'app/shared/shared.module';
import { JhipsterHelloWorld3CoreModule } from 'app/core/core.module';
import { JhipsterHelloWorld3AppRoutingModule } from './app-routing.module';
import { JhipsterHelloWorld3HomeModule } from './home/home.module';
import { JhipsterHelloWorld3EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    JhipsterHelloWorld3SharedModule,
    JhipsterHelloWorld3CoreModule,
    JhipsterHelloWorld3HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    JhipsterHelloWorld3EntityModule,
    JhipsterHelloWorld3AppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class JhipsterHelloWorld3AppModule {}
