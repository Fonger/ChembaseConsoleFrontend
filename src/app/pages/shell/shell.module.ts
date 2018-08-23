import { NgModule } from '@angular/core'

import { ThemeModule } from '../../@theme/theme.module'
import { ShellComponent } from './shell.component'
import { ChemShellComponent } from '../components/chemshell/chemshell.component'

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ShellComponent,
    ChemShellComponent,
  ],
})
export class ShellModule { }
