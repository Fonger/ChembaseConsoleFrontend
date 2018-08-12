import { NgModule } from '@angular/core';
import { Ng2SmartTableModule, DefaultEditor } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthenticationComponent } from './authentication.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { ReadonlyEditorComponent } from './readonly.editor.component';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    Ng2SmartTableModule,
  ],
  entryComponents: [
    ReadonlyEditorComponent,
  ],
  declarations: [
    AuthenticationComponent,
    ReadonlyEditorComponent,
  ],
})
export class AuthenticationModule { }
