import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtilceService } from '../../../services/article/artilce.service'
import { pathHead } from 'src/app/config';
import { Utils } from '../../../common/helper/utils-helper'
import { NzMessageService } from 'ng-zorro-antd'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mpr-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  keyWords:any;
  keywords:any;
  node:any;
  content:any;
  comment:any;
  text:string = '';
  commentData: any;
  data: any;
  item :any={ };
  constructor(
    private route: ActivatedRoute,
    private articleService: ArtilceService,
    public message:NzMessageService,
    private router:Router,
    private sanitizer: DomSanitizer
    ) {
      this.handleClickUl = this.handleClickUl.bind(this);
  }
  showTextarea:Boolean = false;
  avatar:any;
  id: any;
  pathFilter(value:string){
    return pathHead + value;
  }
  async loadDetail() {
    //console.log(this.route.snapshot.queryParamMap.get('_id'));
    this.id = this.route.snapshot.queryParamMap.get('_id');
    try {
      this.data = await this.articleService.getArticle({ _id: this.id })
      console.log(this.data.data[0])
      this.item = this.data.data[0];
      this.content =  this.sanitizer.bypassSecurityTrustHtml(this.item.content)
    } catch (error) {
      console.log(error)
    }
  }
  async handleSend(){
    if(!Utils.getCookie('userinfo')){
      this.message.warning('请登录后再操作');
      return;
    }
    if(this.text.trim()==''){
      this.message.warning('请输入留言内容');
      return;
    }
    console.log(this.text);
    console.log(JSON.parse(Utils.getCookie("userinfo")))
    let params = {
      id: this.id,
      avatar:JSON.parse(Utils.getCookie("userinfo")).avatar,
      name: JSON.parse(Utils.getCookie("userinfo")).username,
      email:JSON.parse(Utils.getCookie("userinfo")).email,
      content: this.text,
      type: 2  //1 评论 2 留言
    };
    console.log(params)
    this.commentData =await this.articleService.addComment(params);
    if(this.commentData&&this.commentData.success){
      this.message.success('操作成功')
    }else{
      this.message.error('操作失败')
    }
    this.text='';
    this.loadDetail()

  }

  /**
   *
   * 优化ngFor性能(根据indexDOM只重绘了修改和增加的项)
   * @param {*} index
   * @param {*} item
   * @returns
   * @memberof DetailComponent
   */
  trackByIndex(index, item){
    return index;
  }
  async handleDelete(item){
    try {
      let params = {
        id:this.id,
        commentId:item._id
      }
      this.commentData = await this.articleService.deleteComment({params});
      if(this.commentData.success){
        this.message.success('删除成功')
        this.loadDetail();
      }else{
        this.message.warning('删除失败')
      }
    } catch (err) {
      console.log(err)
    }
  }
  localUserEmail(){
    if(Utils.getCookie('userinfo')) return JSON.parse(Utils.getCookie('userinfo')).email
  }
  handleClickUl(e){
    console.log(this)
    this.keyWords = document.querySelector('#keyWords');
    this.node = e.target;
    // this.nodeName = this.node.nodeName;
    if(e.target.nodeName==='LI'||e.target.nodeName==='li'){
      console.log(window.location.pathname)
      if(window.location.pathname!=='/index')this.router.navigate(['./index'])
      //搜索框置空
      this.keyWords.value='';
      this.keywords = this.node.innerHTML;
      if(this.keywords==='全部文章')this.keywords='';
      this.router.navigate(['./index'],{queryParams:{keyWords:this.keywords}})
    }

  }
  ngAfterViewInit(){
    let ul = document.getElementsByClassName('ul')[0];
    ul.addEventListener('click',this.handleClickUl,false)
  }
  ngOnDestroy(){
    let ul = document.getElementsByClassName('ul')[0];
    ul.removeEventListener('click',this.handleClickUl,false)
  }
  ngOnInit() {
    this.loadDetail();
    if (Utils.getCookie("userinfo")) {
      this.avatar=JSON.parse(Utils.getCookie("userinfo")).avatar;
      console.log(this.avatar)
    }else{
      this.avatar ='/images/default.jpg';
    }
  }

}