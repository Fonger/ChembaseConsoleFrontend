import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';

import { PagesComponent, NoLabComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateBeakerComponent } from './beakers/create-beaker.component';
import { ConfigBeakerComponent } from './beakers/config-beaker.component';
import { BeakerComponent } from './beakers/beaker.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ShellComponent } from './shell/shell.component';
import { LabResolver } from './lab-resolver.service';
import { BeakerResolver } from './beaker-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: NoLabComponent,
  },
  {
    path: ':labId',
    component: PagesComponent,
    resolve: {
      lab: LabResolver,
    },
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
        resolve: {
          beaker: BeakerResolver,
        },
        children: [
          {
            path: 'data',
            component: BeakerComponent,
          },
          {
            path: 'config',
            component: ConfigBeakerComponent,
          },
        ],
      },
      {
        path: 'auth',
        component: AuthenticationComponent,
      },
      {
        path: 'shell',
        component: ShellComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
