import { NgModule } from '@angular/core'

import { ThemeModule } from '../../@theme/theme.module'
import { BeakerComponent } from './beaker.component'
import { BSONEditorComponent } from '../components/bsoneditor/bsoneditor.component'

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    BeakerComponent,
    BSONEditorComponent,
  ],
})
export class BeakerModule { }
