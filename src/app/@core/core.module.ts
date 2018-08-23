import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injectable } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthService } from '@nebular/auth'
import { NbSecurityModule, NbRoleProvider } from '@nebular/security'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators/map'
import { throwIfAlreadyLoaded } from './module-import-guard'
import { DataModule } from './data/data.module'
import { AnalyticsService } from './utils/analytics.service'
import { environment } from '../../environments/environment'

@Injectable()
export class NbSimpleRoleProvider extends NbRoleProvider {
  constructor(private authService: NbAuthService) {
    super()
  }
  getRole(): Observable<string> {
    return this.authService.onTokenChange()
      .pipe(
        map((token: NbAuthJWTToken) => {
          return token.isValid() ? token.getPayload()['role'] : 'guest'
        }),
      )
  }
}

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'token',
        },
        baseEndpoint: `${environment.apiBaseUri}/api/v1/admin`,
        login: {
          endpoint: '/auth/sign-in',
          method: 'post',
        },
        register: {
          endpoint: '/auth/sign-up',
          method: 'post',
        },
        logout: {
          endpoint: '/auth/sign-out',
          method: 'post',
        },
        requestPass: {
          endpoint: '/auth/request-pass',
          method: 'post',
        },
        resetPass: {
          endpoint: '/auth/reset-pass',
          method: 'post',
        },
      }),
    ],
    forms: {
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
]

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    }
  }
}
