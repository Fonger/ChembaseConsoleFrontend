import { NgModule } from '@angular/core';
import { Ng2SmartTableModule, DefaultEditor } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthenticationComponent } from './authentication.component';
import { FormsModule } from '@angular/forms';
import { LabUserIdEditorComponent, LdapUserNameRenderComponent, JSONModalContentComponent } from './lab-user-cell.component';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    LabUserIdEditorComponent,
    LdapUserNameRenderComponent,
    JSONModalContentComponent,
  ],
  declarations: [
    AuthenticationComponent,
    LabUserIdEditorComponent,
    LdapUserNameRenderComponent,
    JSONModalContentComponent,
  ],
})
export class AuthenticationModule { }
