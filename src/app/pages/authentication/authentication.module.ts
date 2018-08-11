import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AuthenticationComponent } from './authentication.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';


@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    AuthenticationComponent,
  ],
})
export class AuthenticationModule { }
