import { Component, OnInit } from '@angular/core';
import { ArtilceService }  from '../../../services/article/artilce.service'
import { Router } from '@angular/router'
@Component({
  selector: 'mpr-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  
  data: any;
  resData:any;
  total: any;
  pageNumber: number;
  constructor(public articleService:ArtilceService, public router:Router) { }
  handleClick(item) {
    //console.log(item)
    this.router.navigate(['./details'], { queryParams: { '_id': item._id } });

  }
  async loadData(page: number = 1) {
    try {
      this.resData = await this.articleService.getArticle({
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
  async loadPageNumber() {
    try {
      this.total = await this.articleService.getArticle({ count: 1 });
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

}
