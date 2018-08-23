import { NgModule } from '@angular/core'

import { ThemeModule } from '../../@theme/theme.module'
import { ConfigBeakerComponent } from './config-beaker.component'


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ConfigBeakerComponent,
  ],
})
export class ConfigBeakerModule { }
