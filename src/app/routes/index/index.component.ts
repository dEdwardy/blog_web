import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { LoginService } from '../../services/login/login.service'
import { NzMessageService } from 'ng-zorro-antd'
import { Router } from '@angular/router'
@Component({
  selector: 'mpr-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  login= {
    active: true,
    name  : '登录',
    icon  : 'apple'
  };
  reg =  {
    active: false,
    name  : '注册',
    icon  : 'android'
  };
  array = [ 1, 2, 3, 4 ];
  validateLoginForm: FormGroup;
  validateRegForm: FormGroup;
  res: any;
  usernameChange(e){
    console.log(e)
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateRegForm.controls.checkPassword.updateValueAndValidity());
  }
  uniqueEmailValidator = (control: FormControl):{[s:string] :boolean} =>{
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if(!control.value){
      return {required:true}
    }else if(!reg.test(control.value)){
      console.log('00000')
      return { confirm: true, error: true };
    }else{
      console.log('1111111111')
    }

  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateRegForm.controls.regPassword.value) {
      return { confirm: true, error: true };
    }
  };
  async submitRegForm(value){
    let valid:Boolean = true;
    for (const i in this.validateRegForm.controls) {
      this.validateRegForm.controls[ i ].markAsDirty();
      this.validateRegForm.controls[ i ].updateValueAndValidity();
      valid = this.validateRegForm.controls[i].valid && valid;
    }
    if(valid){

    }else{
      return false;
    }
    let {regUsername,regPassword,checkPassword,email} = value;
    console.log(regUsername)
    console.log(regPassword)
    console.log(email)
    
  }
  async submitLoginForm(value) {
    console.log(value)
    let {username,password,remember} = value;
    console.log(username)
    console.log(password)
    console.log(remember)
    if (username || password) {
      try {
        this.res = await this.loginService.login({ username, password });
        if (this.res.success === 1) {
              if(this.res.data.authority===1){
                this.routeTo('admin/index');
                this.message.success('欢迎进入管理界面!');
                localStorage.setItem('token',this.res.token||'');
              }else{
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

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService, public message: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateLoginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false ]
    });
    this.validateRegForm = this.fb.group({
      regUsername: [null, [Validators.required]],
      regPassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      email: [ null, [ Validators.email, Validators.required,this.uniqueEmailValidator ] ]
    });
  }
}