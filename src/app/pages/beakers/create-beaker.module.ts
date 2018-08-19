import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CreateBeakerComponent } from './create-beaker.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';


@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    CreateBeakerComponent,
  ],
})
export class CreateBeakerModule { }
