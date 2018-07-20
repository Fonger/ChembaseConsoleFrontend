import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateBeakerComponent } from './create-beaker.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    CreateBeakerComponent,
  ],
})
export class CreateBeakerModule { }
