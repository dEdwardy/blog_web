import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtilceService } from '../../../services/article/artilce.service'
import { pathHead } from 'src/app/config';
import { Utils } from '../../../common/helper/utils-helper'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'mpr-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  comment:any;
  text:string = '';
  commentData: any;
  data: any;
  item :any={ };
  constructor(private route: ActivatedRoute, private articleService: ArtilceService, public message:NzMessageService, private router:Router) {

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