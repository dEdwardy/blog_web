import { Component, OnInit } from '@angular/core';
import { ArtilceService }  from '../../../services/article/artilce.service'
import { Router, ActivatedRoute } from '@angular/router'
import { pathHead } from '../../../config'
@Component({
  selector: 'mpr-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  
  node:any;
  nodeName:any;
  totalSearch:any;
  resDataSearch;
  //搜索框的关键词
  keyWords:any;
  //ul关键词
  keywords:string = '';
  data: any;
  resData:any;
  total: any;
  pageNumber: number;
  search:Boolean = false;
  currentPage:number = 1;
  constructor(public articleService:ArtilceService, public router:Router, private route:ActivatedRoute) { }
  handleClick(item) {
    //console.log(item)
    this.router.navigate(['./index/detail'], { queryParams: { '_id': item._id } });

  }
  async loadPageNumber(params={keyWords:this.keywords||''}) {
    if(this.search)params={keyWords:this.keyWords.value||''}
    try {
      this.total = await this.articleService.getArticle({ ...params,count: 1 });
      this.pageNumber = this.total.length;
    } catch (err) {
      console.log(err);
    }
  }
  async loadData(
    page: number = 1,
    params= { keyWords: this.keywords||''}
    ) {
    console.log(params)
    this.currentPage = page;
    console.log(this.currentPage)
    if(this.search)params={keyWords:this.keyWords.value}
    try {
      this.resData = await this.articleService.getArticle({
        ...params,
        skip: (this.currentPage - 1) * 10,
        limit: 10
      });
      this.data = this.resData.data;
      if(this.data){
        this.data.map(item => {
          item.label = item.label.split(",").join(" & ");
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  srcFilter(arr){
    if(arr.length===0){
      return pathHead+'/images/default.png'
    }
    return pathHead+arr[0];
  }
  async handleClickDislike(item){
    console.log(item)
    try {
      const data = await this.articleService.dislikeArticle({
        id: item._id,
        dislike: 1
      })
    } catch (err) {
      console.log(err)
    }
    if(this.keywords=='全部文章')this.keywords=''
    if(this.search)this.keywords = this.keyWords.value;
    this.loadData(this.currentPage,{keyWords:this.keywords});
  }
  async handleClickLike(item){
    console.log(item);
    try {
      const data = await this.articleService.likeArticle({
        id: item._id,
        like: 1
      })
    } catch (err) {
      console.log(err)
    }
    if(this.keywords=='全部文章')this.keywords=''
    if(this.search)this.keywords = this.keyWords.value;
    this.loadData(this.currentPage,{keyWords:this.keywords});
  }
  limitLength(value,number=40){
    if(typeof value==='string'){
      return (value&&value.length>number)?value.substring(-1,number)+'......':value;
    }
  }
  ngOnInit() {
    this.keywords = this.route.snapshot.queryParamMap.get('keyWords')||'';
    this.loadPageNumber();
    this.loadData();
  }
  ngAfterViewInit(){
    this.keyWords = document.querySelector('#keyWords');
    let btn = document.querySelector('.search');
    btn.addEventListener('click',() => {
      this.search = true;
      this.router.navigate(['./index'],{queryParams:{keyWords:this.keyWords.value}})
      this.handleClickSearch(this.keyWords.value)
    })
    this.keyWords.addEventListener('keyup',(e) => {
      if(e.keyCode===13){
        this.search = true;
        this.router.navigate(['./index'],{queryParams:{keyWords:this.keyWords.value}})
        this.handleClickSearch(this.keyWords.value)
      }
    })
    let ul = document.getElementsByClassName('ul')[0];
    ul.addEventListener('click',(e) => {
      this.node = e.target;
      this.nodeName = this.node.nodeName;
      if(this.nodeName==='LI'||this.nodeName==='li'){
        if(window.location.pathname!=='/index')this.router.navigate(['./index'])
        //搜索框置空
        this.keyWords.value='';
        this.keywords = this.node.innerHTML;
        if(this.keywords==='全部文章')this.keywords='';
        this.router.navigate(['./index'],{queryParams:{keyWords:this.keywords}})
        this.loadPageNumber({ keyWords:this.keywords})
        this.loadData(1,{ keyWords:this.keywords })
      }

    })
  }
  ngOnDestroy(){
    let btn = document.querySelector('.search');
    btn.removeEventListener('click',() => {
      this.handleClickSearch(this.keyWords.value)
    },false)
    this.keyWords.removeEventListener('keyup',(e) => {
      if(e.keyCode===13){
        this.handleClickSearch(this.keyWords.value)
      }
    },false)
  }
  async handleClickSearch(keyWords) {
    try {
      if(this.search)this.currentPage=1;
       await this.loadPageNumber({keyWords})
       await this.loadData(this.currentPage, { keyWords })
       this.search = false;
    } catch (error) {
      console.log(error);
    }
  }
}
