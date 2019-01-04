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
import { IndexComponent as AdminIndex } from './routes/admin/index/index.component';
import { BasicAuthInterceptor } from './helpers/basicAuth.interceptor'
import zh from '@angular/common/locales/zh';
import { DetailsComponent } from './routes/admin/details/details.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';
import { RegComponent } from './routes/reg/reg.component';
import { IndexComponent } from './routes/index/index.component';
import { StrLengthPipe } from './common/pipe/str-length.pipe';
import { PathPipe } from './common/pipe/path.pipe';
import { CanAuthProvide } from './services/guard/can-auth.provide'
// import { DetailComponent } from './routes/index/detail/detail.component';
// import { ArticleComponent } from './routes/index/article/article.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminIndex,
    IndexComponent,
    DetailsComponent,
    NotFoundComponent,
    RegComponent,
    StrLengthPipe,
    PathPipe
    // DetailComponent,
    // ArticleComponent
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
    CanAuthProvide
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
