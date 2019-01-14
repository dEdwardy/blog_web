import { Component, OnInit } from '@angular/core';
import { ArtilceService }  from '../../../services/article/artilce.service'
import { Router } from '@angular/router'
import { NzUploadBtnComponent } from 'ng-zorro-antd';
@Component({
  selector: 'mpr-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
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
      this.data.map(item => {
        item.label = item.label.split(",").join(" & ");
      });
    } catch (error) {
      console.log(error);
    }
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
