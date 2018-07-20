import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AuthenticationComponent } from './authentication.component';


@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    AuthenticationComponent,
  ],
})
export class AuthenticationModule { }
