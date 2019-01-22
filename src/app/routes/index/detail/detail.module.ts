import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component'
import { NgZorroAntdModule } from 'ng-zorro-antd'
@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule.forChild([
      {path:'',component:DetailComponent}
    ])
  ],
  declarations: [DetailComponent]
})
export class DetailModule { }
