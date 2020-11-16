import { Route } from '@angular/router';

import { HomeComponent } from './home.component';

export const HOME_ROUTE: Route = {
  path: 'home-notused',
  component: HomeComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title',
  },
};
