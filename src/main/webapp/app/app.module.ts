import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { EmithramInsuranceSharedModule } from 'app/shared/shared.module';
import { EmithramInsuranceCoreModule } from 'app/core/core.module';
import { EmithramInsuranceAppRoutingModule } from './app-routing.module';
import { EmithramInsuranceHomeModule } from './home/home.module';
import { InsuranceModule } from './insurance/insurance.module';
import { EmithramInsuranceEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { InsuranceNavbarComponent } from './layouts/insurance-navbar/insurance-navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    EmithramInsuranceSharedModule,
    EmithramInsuranceCoreModule,
    EmithramInsuranceHomeModule,
    InsuranceModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    EmithramInsuranceEntityModule,
    EmithramInsuranceAppRoutingModule,
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    InsuranceNavbarComponent,
  ],
  bootstrap: [MainComponent],
})
export class EmithramInsuranceAppModule {}
