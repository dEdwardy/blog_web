import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './routes/login/login.component';
import { LoginService } from './services/login/login.service';
import { IndexComponent } from './routes/admin/index/index.component';
import { TimePipe } from './common/pipe/time.pipe';
import { BasicAuthInterceptor } from './helpers/basicAuth.interceptor'
import zh from '@angular/common/locales/zh';
import { DetailsComponent } from './routes/admin/details/details.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    TimePipe,
    DetailsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi:true },
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
