import { NgModule } from '@angular/core'

import { PagesComponent, NoLabComponent } from './pages.component'
import { DashboardModule } from './dashboard/dashboard.module'
import { BeakerModule } from './beakers/beaker.module'
import { PagesRoutingModule } from './pages-routing.module'
import { ThemeModule } from '../@theme/theme.module'
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module'
import { CreateBeakerModule } from './beakers/create-beaker.module'
import { ConfigBeakerModule } from './beakers/config-beaker.module'
import { AuthenticationModule } from './authentication/authentication.module'
import { ShellModule } from './shell/shell.module'
import { LabResolver } from './lab-resolver.service'
import { BeakerResolver } from './beaker-resolver.service'

const PAGES_COMPONENTS = [
  NoLabComponent,
  PagesComponent,
]

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    BeakerModule,
    CreateBeakerModule,
    ConfigBeakerModule,
    ShellModule,
    AuthenticationModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    LabResolver,
    BeakerResolver,
  ],
})
export class PagesModule {
}
