import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EmithramInsuraneSharedModule } from 'app/shared/shared.module';
import { EmithramInsuraneCoreModule } from 'app/core/core.module';
import { EmithramInsuraneAppRoutingModule } from './app-routing.module';
import { EmithramInsuraneHomeModule } from './home/home.module';
import { EmithramInsuraneEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    EmithramInsuraneSharedModule,
    EmithramInsuraneCoreModule,
    EmithramInsuraneHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EmithramInsuraneEntityModule,
    EmithramInsuraneAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class EmithramInsuraneAppModule {}
