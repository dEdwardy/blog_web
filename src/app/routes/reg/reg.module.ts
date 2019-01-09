import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CustomFormModule } from '../../components/custom-form/custom-form.module'
import { RegComponent } from './reg.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    CustomFormModule,
    RouterModule.forChild([{ path: '', component: RegComponent }]),
  ],
  declarations: [RegComponent]
})
export class RegModule { }
