import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './components/portal/index/index.component';
import { OrganizationComponent } from './components/sys/organization/organization.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { DlgOrganizationDetailComponent } from './components/sys/dialogs/dlg-organization-detail/dlg-organization-detail.component';
import { DynamicRequiredDirective } from './shared/dynamic-required.directive';
import { HoneyValidatorsDirective } from './shared/honey-validators.directive';

registerLocaleData(zh);



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    OrganizationComponent,
    DlgOrganizationDetailComponent,
    DynamicRequiredDirective,
    HoneyValidatorsDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
