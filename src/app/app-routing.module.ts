import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AuthGuardService } from './auth-guard.service';
import { LabListResolver } from './pages/labs-resolver.service';
import { ChemLoginComponent } from './@theme/components/auth/login/login.comonent';
import { ChemAuthComponent } from './@theme/components/auth/auth.component';

const routes: Routes = [
  {
    path: 'labs',
    canActivate: [AuthGuardService],
    loadChildren: 'app/pages/pages.module#PagesModule',
    resolve: {
      labs: LabListResolver,
    },
  },
  {
    path: 'auth',
    component: ChemAuthComponent,
    children: [
      {
        path: '',
        component: ChemLoginComponent,
      },
      {
        path: 'login',
        component: ChemLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'labs', pathMatch: 'full' },
  { path: '**', redirectTo: 'labs' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
