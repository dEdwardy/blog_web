import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component'
import { NgZorroAntdModule } from 'ng-zorro-antd'
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {path:'',component:ArticleComponent}
    ])
  ],
  declarations: [ArticleComponent]
})
export class ArticleModule { }
