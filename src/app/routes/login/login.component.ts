import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { NzMessageService } from "ng-zorro-antd";
import { Router } from "@angular/router";
import { Utils } from '../../common/helper/utils-helper';

@Component({
  selector: "mpr-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
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
    let [email, password, remember] = arr;
    if (email || password) {
      try {
        this.res = await this.loginService.login({ email, password });
        if (this.res.success === 1) {
          localStorage.setItem("token", this.res.token || "");
          localStorage.setItem("authority", this.res.data.authority || 0);
          if (this.res.data.authority === 1) {
            this.routeTo("admin/index");
            this.message.success("欢迎进入管理界面!");
            console.log(this.res.data);
          } else {
            this.message.warning("非系统管理员!");
            this.router.navigate(["/"]);
          }
        } else {
          this.message.error("账号或密码错误!");
          console.log("登录失败!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return false;
    }
  }
  public routeTo(path) {
    switch (path) {
      case "admin/index":
        this.router.navigate(["admin/index"]);
        break;
      default:
        break;
    }
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
  }
}
