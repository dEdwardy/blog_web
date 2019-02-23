import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailsComponent } from './details.component'
import { NgZorroAntdModule } from 'ng-zorro-antd'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:DetailsComponent}
    ])
  ],
  declarations: [DetailsComponent]
})
export class DetailsModule { }
