import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StateService } from './state.service';
import { LabService } from './lab.service';
import { TokenInterceptor } from '../utils/token.interceptor';
import { BeakerService } from './beaker.service';
import { CompoundService } from './compound.service';

const SERVICES = [
  StateService,
  LabService,
  BeakerService,
  CompoundService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
      ],
    };
  }
}
