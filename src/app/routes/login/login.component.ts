import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from '../../services/login/login.service'
import { NzMessageService } from 'ng-zorro-antd'
import { Router } from '@angular/router'
import { resolve } from 'url';
import { reject } from 'q';
import { LowerCasePipe, DatePipe } from '@angular/common';
@Component({
  selector: 'mpr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  res: any;
  async submitForm() {
    let arr = [];
    for (const i in this.validateForm.controls) {
      arr.push(this.validateForm.controls[i].value);
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let [username,password,remember] = arr;
    if (username || password) {
      this.loginService.login({ username, password }).subscribe(res => {
        this.res = res;
        if (this.res.success === 1) {
          this.message.success("登录成功！")
          console.log(this.res)
          localStorage.setItem('token',this.res.token)
          this.routeTo('index');
        } else {
          this.message.warning("登录失败！")
          console.log('登录失败!')
        }})
    } else {
      return false;
    }
  }
  public routeTo(path) {
    switch (path) {
      case 'index':
        this.router.navigate(['index']);
        break;
      default:
        break;

    }
  }

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false ]
    });
  }
}