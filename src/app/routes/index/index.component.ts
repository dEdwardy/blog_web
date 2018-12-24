import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from '../../services/login/login.service'
import { NzMessageService,NzModalService } from 'ng-zorro-antd'
import { Router } from '@angular/router'
import { ArtilceService } from '../../services/article/artilce.service'

@Component({
  selector: 'mpr-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  total: any;
  pageNumber: number;
  resData: any;
  deleteInfo: any;
  data: any;
  login = {
    active: true,
    name: '登录',
    icon: 'apple'
  };
  reg = {
    active: false,
    name: '注册',
    icon: 'android'
  };
  loading: Boolean = false;
  status: number;
  emailRes: any;
  array = [1, 2, 3, 4];
  validateLoginForm: FormGroup;
  validateRegForm: FormGroup;
  res: any;
  //验证邮箱是否唯一
  async handleEmailChange(email) {
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (!reg.test(email)) return;
    try {
      this.loading = true;
      this.emailRes = await this.loginService.uniqueEmail({ email });
      this.loading = false;
      this.status = this.emailRes.result;
      console.log(this.emailRes)
    } catch (error) {
      console.log(error)
    }
  }
  //验证邮箱格式
  uniqueEmailValidator = (control: FormControl): { [s: string]: boolean } => {
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if (!control.value) {
      return { required: true }
    } else if (!reg.test(control.value)) {
      return { confirm: true, error: true };
    }

  }
  //验证密码是否相同
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateRegForm.controls.regPassword.value) {
      return { confirm: true, error: true };
    } else {
      console.log('ok')
    }
  };
  //注册
  async submitRegForm(value) {
    let valid: Boolean = true;
    for (const i in this.validateRegForm.controls) {
      this.validateRegForm.controls[i].markAsDirty();
      this.validateRegForm.controls[i].updateValueAndValidity();
      valid = this.validateRegForm.controls[i].valid && valid;
    }
    if (valid) {
      console.log(valid)
    } else {
      return false;
    }
    let { regUsername, regPassword, checkPassword, email } = value;
    console.log(regUsername)
    console.log(regPassword)
    console.log(email)

  }
  //登录
  async submitLoginForm(value) {
    let { email, password, remember } = value;
    if(email&&password){console.log('000')}
    if (email && password) {
      try {
        this.res = await this.loginService.login({ email, password });
        if (this.res.success === 1) {
          if (this.res.data.authority === 1) {
            this.routeTo('admin/index');
            this.message.success('欢迎进入管理界面!');
            localStorage.setItem('token', this.res.token || '');
          } else {
            this.message.warning('非系统管理员!')
            this.router.navigate(['/']);
          }
        } else {
          this.message.error("账号或密码错误!")
          console.log('登录失败!')
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      return false;
    }
  }
  //路由跳转
  public routeTo(path) {
    switch (path) {
      case 'index':
        this.router.navigate(['index']);
        break;
      case 'admin/index':
        this.router.navigate(['admin/index']);
        break;
      default:
        break;

    }
  }

  constructor(private fb: FormBuilder,
     private router: Router, 
     private loginService: LoginService, 
     public message: NzMessageService,
     private articleService: ArtilceService, 
     public modalService: NzModalService) {
  }
  handleClickDelete(e, id) {
    e.stopPropagation();
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete this item?',
      nzContent: 'Are you sure to delete this item?',
      nzOnOk: async () => {
        try {
          this.deleteInfo = await this.articleService.deleteArticle({ params: { id } });
          if (this.deleteInfo.n === 1) {               //n 受影响的条数(即删除的条数)
            this.message.success('删除成功！')
            this.loadPageNumber();
            this.loadData();
          } else {
            this.message.error('删除失败！')
          }
        } catch (error) {
          console.log(error)
        }
      }
    });
  }
  handleClick(item) {
    //console.log(item)
    this.router.navigate(['details'], { queryParams: { '_id': item._id } });

  }
  async loadPageNumber() {
    try {
      this.total = await this.articleService.getArticle({ count: 1 })
      this.pageNumber = this.total.length;
    } catch (error) {
      console.log(error)
    }
  }
  async loadData(page: number = 1) {
    try {
      this.resData = await this.articleService.getArticle({ skip: (page - 1) * 10, limit: 10 });
      this.data = this.resData.data;
      this.data.data.map(item => {
        item.label = item.label.split(',').join(' & ');
      })
    } catch (error) {
      console.log(error)
    }
  }
  ngOnInit(): void {
    this.loadPageNumber();
    this.loadData();
    this.validateLoginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
    this.validateRegForm = this.fb.group({
      regUsername: [null, [ Validators.required ]],
      regPassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      email: [null, [Validators.email, Validators.required, this.uniqueEmailValidator]]
    });
  }
}