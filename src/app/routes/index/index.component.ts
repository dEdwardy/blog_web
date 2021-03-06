import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { LoginService } from "../../services/login/login.service";
import { NzMessageService, NzModalService } from "ng-zorro-antd";
import { Router } from "@angular/router";
import { ArtilceService } from "../../services/article/artilce.service";
import { Utils } from "src/app/common/helper/utils-helper";
import { NzIconService} from 'ng-zorro-antd';

@Component({
  selector: "mpr-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {
  menuFlag:Boolean = true;
  visible:Boolean = false;
  flag:Boolean = false;
  location:string = window.location.pathname; 
  open:Boolean=false;
  authority: Number = 0;
  authorityRes: any;
  regRes: any = {};
  total: any;
  pageNumber: number;
  resData: any;
  deleteInfo: any;
  data: any;
  login = {
    active: true,
    name: "登录",
    icon: "user"
  };
  reg = {
    active: false,
    name: "注册",
    icon: "user-add"
  };
  loading: Boolean = false;
  status: number;
  emailRes: any;
  backgrounImage:string ='../../../assets/images/banner/1.jpg';
  array = [
    '../../../assets/images/banner/1.jpg',
    '../../../assets/images/banner/2.jpg',
    '../../../assets/images/banner/3.jpg',
    '../../../assets/images/banner/4.jpg',
    '../../../assets/images/banner/5.jpg',
  ];
  validateLoginForm: FormGroup;
  validateRegForm: FormGroup;
  res: any = {};
  username: string;
  avatar: string;
  keywords: string;
  loginOut() {
    this.authority = null;
    Utils.delCookie("userinfo");
    localStorage.clear();
    if (Utils.getCookie("userinfo")) Utils.delCookie("userinfo");
    this.validateLoginForm.reset();
    this.checkAuthority();
  }
  isLogin(): Boolean {
    if (Utils.getCookie("userinfo")) {
      this.username = JSON.parse(Utils.getCookie("userinfo")).username;
      this.avatar = JSON.parse(Utils.getCookie("userinfo")).avatar;
      return true;
    }
    return false;
  }
  //验证邮箱是否唯一
  async handleEmailChange(email) {
    let reg = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    if (!reg.test(email)) return;
    try {
      this.loading = true;
      this.emailRes = await this.loginService.uniqueEmail({ email });
      this.loading = false;
      this.status = this.emailRes.result;
      console.log(this.emailRes);
    } catch (error) {
      console.log(error);
    }
  }
  //验证邮箱格式
  EmailValidator = (control: FormControl): { [s: string]: boolean } => {
    let reg = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    if (!control.value) {
      return { required: true };
    } else if (!reg.test(control.value)) {
      return { confirm: true, error: true };
    }
  };
  //验证密码是否相同
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (
      control.value !== this.validateRegForm.controls.regPassword.value
    ) {
      return { confirm: true, error: true };
    } else {
      console.log("ok");
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
      console.log(valid);
    } else {
      return false;
    }
    let { regUsername, regPassword, email } = value;
    this.regRes = await this.loginService.reg({
      username: regUsername,
      password: this.trim(regPassword),
      email: email
    });
    if (this.regRes.success === 1) {
      this.message.success("注册成功！");
      this.validateRegForm.reset();
    } else {
      this.message.error("注册失败！");
    }
    this.checkAuthority();
  }
  getAuthority() {
    return JSON.parse(Utils.getCookie("userinfo"))
      ? JSON.parse(Utils.getCookie("userinfo")).authority
      : 0;
  }
  //登录
  async submitLoginForm(value) {
    let reg = new RegExp(
      "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    let { email, password, remember } = value;
    if (email && password) {
      if (!reg.test(email)) {
        this.message.warning("请输入正确格式的邮箱!");
        return false;
      }
      try {
        this.res = await this.loginService.login({
          email,
          password: this.trim(password)
        });
        if (this.res.success === 1) {
          window.location.reload();
          let userinfo1 = {
            username: this.res.data.username,
            avatar: this.res.data.avatar,
            email: this.res.data.email,
            like:this.res.data.like,
            dislike:this.res.data.dislike,
            authority: this.res.data.authority
          };
          let userinfo2 = {
            username: this.res.data.username,
            avatar: this.res.data.avatar,
            email: this.res.data.email,
            authority: this.res.data.authority
          };
          localStorage.setItem("token", this.res.token || "");
          localStorage.setItem("userinfo", JSON.stringify(userinfo1));
          Utils.setCookie("userinfo", JSON.stringify(userinfo2));
          if (this.res.data.authority === 1) {
            this.authority = 1;
          }
          console.log(this.res);
        } else {
          this.message.error("账号或密码错误!");
          console.log("登录失败!");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.message.warning("请输入账号和密码！");
      return false;
    }
  }
  //路由跳转
  public routeTo(path) {
    switch (path) {
      case "index":
        this.router.navigate(["index"]);
        break;
      case "admin/index":
        this.router.navigate(["./admin/index"]);
        break;
      default:
        break;
    }
  }
  //去掉空格
  trim(str) {
    if (typeof str !== "string") return;
    return str.replace(/\s+/g, "");
  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    public message: NzMessageService,
    private articleService: ArtilceService,
    public modalService: NzModalService,
    public iconService:NzIconService
  ) {
  }
  handleClick(item) {
    this.router.navigate(["details"], { queryParams: { _id: item._id } });
  }
  async loadData(page: number = 1, params = {}) {
    try {
      this.resData = await this.articleService.getArticle({
        ...params,
        skip: (page - 1) * 10,
        limit: 10
      });
      this.pageNumber = this.resData.length;
      this.data = this.resData.data;
      this.data.map(item => {
        item.label = item.label.split(",").join(" & ");
      });
    } catch (error) {
      console.log(error);
    }
  }
  async checkAuthority() {
    let userinfo = Utils.getCookie("userinfo");
    if (!userinfo) {
      this.authority = 0;
      return;
    }
    let email = JSON.parse(userinfo).email;
    console.log(JSON.parse(userinfo));
    console.log(email);
    try {
      this.authorityRes = await this.loginService.uniqueEmail({ email });
      this.authority = this.authorityRes.authority;
    } catch (error) {
      console.log(error);
    }
  }
  openMenu(){
    this.menuFlag = true;
    this.open =! this.open;
    this.flag = true;
    let ul =document.getElementsByClassName('ul')[0];
    console.log(ul)
  }
  back(){
    if (window.location.pathname !== '/index') this.router.navigate(['./index'])
  }
  
  ngAfterViewInit(){
    let ul =document.getElementsByClassName('ul')[0];
    ul.addEventListener('click',this.handleClickUl,false);
  }
  ngOnDestroy() {
    let ul =document.getElementsByClassName('ul')[0];
    ul.removeEventListener('click',this.handleClickUl,false);
  }
  handleClickUl(e){
    console.log(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)?'移动端':'PC')
    if (e.target.nodeName === 'LI' || e.target.nodeName === 'li') {
      console.log(window.location.pathname)
      //关闭菜单
     this.open = false;
     console.log(this.open)
      if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
        console.log(this.menuFlag)
        this.menuFlag = false;
      }
    }
  }
  openUserInfo():void{
    this.visible = true;
  }
  hideUl(){
    console.log('Click Ul')
    this.flag= !this.flag;
  }
  close(): void {
    this.visible = false;
  }
  ngOnInit(): void {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_1066420_u183pkhmmp8.js'
    });
    console.log(this.flag&&this.open)
    console.log(this.location!== '/index')
    this.checkAuthority();
    this.validateLoginForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
    this.validateRegForm = this.fb.group({
      regUsername: [null, [Validators.required]],
      regPassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      email: [
        null,
        [Validators.email, Validators.required, this.EmailValidator]
      ]
    });
    console.log(this.getAuthority());
  }
  
}

interface dom{
  style?:string
}