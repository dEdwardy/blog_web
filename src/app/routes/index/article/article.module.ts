import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LazyLoadImageModule } from 'ng-lazyload-image';
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    LazyLoadImageModule,
    RouterModule.forChild([
      {path:'',component:ArticleComponent}
    ])
  ],
  declarations: [ArticleComponent]
})
export class ArticleModule { }
