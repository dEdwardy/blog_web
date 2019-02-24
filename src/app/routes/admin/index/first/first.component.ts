import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import { Observable, Observer } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { NzMessageService, UploadFile } from "ng-zorro-antd";
import { ArtilceService } from "../../../../services/article/artilce.service";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "mpr-first",
  templateUrl: "./first.component.html",
  styleUrls: ["./first.component.scss"]
})
export class FirstComponent implements OnInit {
  updateData:any;
  title:string = '';
  label:string = '';
  content:string = '';
  id:any;
  item:any;
  fileList = [];
  previewImage = "";
  previewVisible = false;
  config: any = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-2" }, { indent: "+2" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],                       // remove formatting button
      ["link", "image","video"]      // link and image, video
    ]
  };

  validateForm: FormGroup;
  listOfOption = [];
  listOfSelectedValue = [];
  data: any;
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
  updateArticle = async (e: MouseEvent,value) => {
    console.log(this.content)
    e.preventDefault()
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    let { title, content, label } = value;
    let params ={
      id:this.id,
      title,
      label,
      content
    }
    try {
      this.updateData = await this.articleService.updateArtilce(params);
      if(this.updateData.success){
        this.message.success('修改成功')
      }else{
        this.message.warning('修改失败')
      }
    } catch (err) {
      console.log(err)
    }
  }
  submitForm = async ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
    let { title, content, label } = value;
    let token = localStorage.getItem("token");
    console.log(content)
    let img = content.match(/\<img(\s)(\S*)\/\>/g); 
    console.log(img);
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
    const children = [];
    const label = [
      "其他",
      "微服务",
      "区块链",
      "超级账本",
      "机器学习",
      "深度学习",
      "计算机视觉",
      "自然语言处理",
      "数据挖掘&分析",
      "小程序",
      "HTML/CSS",
      "Javascript",
      "Vue.js",
      "React.js",
      "Angular",
      "Node.js",
      "jQuery",
      "WebApp",
      "前端工具",
      "Java",
      "SpringBoot ",
      "SSM",
      "Python",
      "爬虫",
      "Django",
      "Flask",
      "Tornado",
      "Go",
      "PHP",
      "WebApp",
      "C",
      "C++",
      "Android ",
      "iOS",
      "React native",
      "Ionic",
      "数据结构与算法",
      "中间件",
      "接口测试",
      "MySQL",
      "Redis",
      "MongoDB"
    ];
    for (let i = 0; i < label.length; i++) {
      children.push({ label: label[i], value: label[i] });
    }
    this.listOfOption = children;
  };
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  async loadDetail() {
    this.id = this.route.snapshot.queryParamMap.get('_id');
    try {
      this.data = await this.articleService.getArticle({ _id: this.id })
      console.log(this.data.data[0])
      this.item = this.data.data[0];
      this.title = this.item.title;
      this.label = this.item.label;
      let arr = this.label.split(',')
       this.listOfSelectedValue=arr;
      console.log(this.listOfOption)
      console.log(arr)
      this.content = this.item.content;
    } catch (error) {
      console.log(error)
    }
  }
  titleAsyncValidator = (control: FormControl) =>
    Observable.create((observer: Observer<ValidationErrors>) => {
      setTimeout(() => {
        if (control.value === "JasonWood") {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  ngOnInit() {
    this.initSelect();
    if(this.route.snapshot.queryParamMap.get('_id')){
      this.loadDetail()
    }
  }
  constructor(
    private fb: FormBuilder,
    private articleService: ArtilceService,
    public message: NzMessageService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.validateForm = this.fb.group({
      title: ["", [Validators.required], [this.titleAsyncValidator]],
      content: ["", [Validators.required]],
      label: ["", [Validators.required]]
    });
  }
}
