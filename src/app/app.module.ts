import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './/app-routing.module';
import { LoginService } from './services/login/login.service';
import { IndexComponent as AdminIndex } from './routes/admin/index/index.component';
import { BasicAuthInterceptor } from './services/guard/basicAuth.interceptor'
import zh from '@angular/common/locales/zh';
import { IndexComponent } from './routes/index/index.component';
import { StrLengthPipe } from './common/pipe/str-length.pipe';
import { PathPipe } from './common/pipe/path.pipe';
import { QuillModule } from 'ngx-quill'
import { CanAuthProvide } from './services/guard/can-auth.provide';
import { LazyLoadImageModule } from 'ng-lazyload-image';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    AdminIndex,
    IndexComponent,
    StrLengthPipe,
    PathPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgZorroAntdModule,
    AppRoutingModule,
    QuillModule,
    LazyLoadImageModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi:true },
    LoginService,
    CanAuthProvide
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
