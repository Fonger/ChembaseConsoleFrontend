import { NgModule } from '@angular/core'


import { ThemeModule } from '../../@theme/theme.module'
import { DashboardComponent } from './dashboard.component'
import { NgxEchartsModule } from 'ngx-echarts'
import { Ng2SmartTableModule } from 'ng2-smart-table'

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
