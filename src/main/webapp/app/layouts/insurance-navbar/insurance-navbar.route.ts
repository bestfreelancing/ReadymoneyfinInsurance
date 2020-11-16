import { Route } from '@angular/router';
import { InsuranceNavbarComponent } from './insurance-navbar.component';

export const insuranceNavbarRoute: Route = {
  path: '',
  component: InsuranceNavbarComponent,
  outlet: 'insurance-navbar',
};
