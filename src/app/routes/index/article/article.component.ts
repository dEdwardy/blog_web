import { Component, OnInit } from '@angular/core';
import { ArtilceService }  from '../../../services/article/artilce.service'
import { Router } from '@angular/router'
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
  keyWords:any;
  data: any;
  resData:any;
  total: any;
  pageNumber: number;
  constructor(public articleService:ArtilceService, public router:Router) { }
  handleClick(item) {
    //console.log(item)
    this.router.navigate(['./details'], { queryParams: { '_id': item._id } });

  }
  async loadData(page: number = 1,params = {}) {
    try {
      this.resData = await this.articleService.getArticle({
        ...params,
        skip: (page - 1) * 10,
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
  async loadPageNumber(params={}) {
    try {
      this.total = await this.articleService.getArticle({ ...params,count: 1 });
      this.pageNumber = this.total.length;
    } catch (error) {
      console.log(error);
    }
  }
  limitLength(value,number=40){
    if(typeof value==='string'){
      return (value&&value.length>number)?value.substring(-1,number)+'......':value;
    }
  }
  ngOnInit() {
    this.loadPageNumber();
    this.loadData();
  }
  ngAfterViewInit(){
    this.keyWords = document.querySelector('#keyWords');
    let btn = document.querySelector('.search');
    btn.addEventListener('click',() => {
      this.handleClickSearch(this.keyWords.value)
    })
    this.keyWords.addEventListener('keyup',(e) => {
      if(e.keyCode===13){
        this.handleClickSearch(this.keyWords.value)
      }
    })
    let ul = document.getElementsByClassName('ul')[0];
    ul.addEventListener('click',(e) => {
      this.node = e.target;
      this.nodeName = this.node.nodeName;
      if(this.nodeName==='LI'||this.nodeName==='li'){
        let keyWords = this.node.innerHTML
        if(keyWords==='全部文章')keyWords=''
        this.loadPageNumber({ keyWords })
        this.loadData(1,{ keyWords })
        console.log(this.node.innerHTML)

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
       await this.loadPageNumber({keyWords})
       await this.loadData(1, { keyWords })
    } catch (error) {
      console.log(error);
    }
  }
}
