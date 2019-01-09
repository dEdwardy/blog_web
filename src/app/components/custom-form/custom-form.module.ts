import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CustomFormComponent } from './custom-form.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [CustomFormComponent],
  exports:[CustomFormComponent]
})
export class CustomFormModule { }
