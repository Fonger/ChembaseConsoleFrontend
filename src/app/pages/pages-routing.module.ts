import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateBeakerComponent } from './beakers/create-beaker.component';
import { ConfigBeakerComponent } from './beakers/config-beaker.component';
import { BeakerComponent } from './beakers/beaker.component';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'createbeaker',
      component: CreateBeakerComponent,
    },
    {
      path: 'beakers/:beakerId',
      component: BeakerComponent,
    },
    {
      path: 'beakers/:beakerId/config',
      component: ConfigBeakerComponent,
    },
    {
      path: 'auth',
      component: AuthenticationComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
