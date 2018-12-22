import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd'
import { ArtilceService } from '../../../../services/article/artilce.service'

@Component({
  selector: 'mpr-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  validateForm: FormGroup;
  listOfOption = [];
  listOfSelectedValue = [];
  data: any;
  submitForm = async ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    let { title, content, label } = value;
    let token = localStorage.getItem('token');
    console.log(token)
    try {
      this.data = await this.articleService.writeArtilce({ title, content, label });
      if (this.data.success === 1) {
        this.message.success('OK！');
        this.validateForm.reset();
      } else {
        this.message.warning('Oops,Something goes wrong!');
      }
      value = [];
    } catch (err) {
      console.log(err)
    }
  };
  initSelect = () => {
    const children = []
    const label = [
      '微服务', '区块链', '超级账本', '机器学习', '深度学习', '计算机视觉', '自然语言处理', '数据挖掘&分析', '小程序', 'HTML/CSS', 'Javascript',
      'Vue.js', 'React.js', 'Angular', 'Node.js', 'jQuery', 'WebApp', '前端工具', 'Java', 'SpringBoot ', 'SSM', 'Python', '爬虫',
      'Django', 'Flask', 'Tornado', 'Go', 'PHP', 'WebApp', 'C', 'C++', 'Android ', 'iOS', 'React native', 'Ionic',
      '数据结构与算法', '中间件', '接口测试', 'MySQL', 'Redis', 'MongoDB'
    ];
    for (let i = 0; i < label.length; i++) {
      children.push({ label: label[i], value: label[i] })
    }
    this.listOfOption = children;
  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }


  titleAsyncValidator = (control: FormControl) => Observable.create((observer: Observer<ValidationErrors>) => {
    setTimeout(() => {
      if (control.value === 'JasonWood') {
        observer.next({ error: true, duplicated: true });
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });
  ngOnInit() {
    this.initSelect();
  }
  constructor(private fb: FormBuilder, private articleService: ArtilceService, public message: NzMessageService) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required], [this.titleAsyncValidator]],
      content: ['', [Validators.required]],
      label: ['', [Validators.required]]
    });
  }
}
