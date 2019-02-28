import { Component, OnInit } from '@angular/core';
import { ArtilceService } from '../../../services/article/artilce.service'
import { Router, ActivatedRoute } from '@angular/router'
import { pathHead } from '../../../config'
@Component({
  selector: 'mpr-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  node: any;
  nodeName: any;
  totalSearch: any;
  resDataSearch;
  //搜索框的关键词
  keyWords: any;
  //ul关键词
  keywords: string = '';
  data: any;
  resData: any;
  total: any;
  pageNumber: number;
  search: Boolean = false;
  currentPage: number = 1;
  constructor(public articleService: ArtilceService, public router: Router, private route: ActivatedRoute) {
    this.handleClickUl = this.handleClickUl.bind(this);
    this.handleClickBtn = this.handleClickBtn.bind(this);
    this.handleClickKeywords = this.handleClickKeywords.bind(this)
  }
  handleClick(item) {
    //console.log(item)
    this.router.navigate(['./index/detail'], { queryParams: { '_id': item._id } });

  }
  async loadData(
    page: number = 1,
    params = { keyWords: this.keywords || '' }
  ) {
    console.log(params)
    this.currentPage = page;
    console.log(this.currentPage)
    if (this.search) params = { keyWords: this.keyWords.value }
    try {
      this.resData = await this.articleService.getArticle({
        ...params,
        skip: (this.currentPage - 1) * 10,
        limit: 10
      });
      this.pageNumber = this.resData.length;
      this.data = this.resData.data;
      if (this.data) {
        this.data.map(item => {
          item.label = item.label.split(",").join(" & ");
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  srcFilter(arr) {
    if (arr.length === 0) {
      return pathHead + '/images/default.png'
    }
    return pathHead + arr[0];
  }
  async handleClickDislike(item) {
    console.log(item)
    try {
      const data = await this.articleService.dislikeArticle({
        id: item._id,
        dislike: 1
      })
    } catch (err) {
      console.log(err)
    }
    if (this.keywords == '全部文章') this.keywords = ''
    if (this.search) this.keywords = this.keyWords.value;
    this.loadData(this.currentPage, { keyWords: this.keywords });
  }
  async handleClickLike(item) {
    console.log(item);
    try {
      const data = await this.articleService.likeArticle({
        id: item._id,
        like: 1
      })
    } catch (err) {
      console.log(err)
    }
    if (this.keywords == '全部文章') this.keywords = ''
    if (this.search) this.keywords = this.keyWords.value;
    this.loadData(this.currentPage, { keyWords: this.keywords });
  }
  limitLength(value, number = 40) {
    if (typeof value === 'string') {
      return (value && value.length > number) ? value.substring(-1, number) + '......' : value;
    }
  }
  ngOnInit() {
    this.keywords = this.route.snapshot.queryParamMap.get('keyWords') || '';
    this.loadData();
  }
  handleClickUl(e) {
    console.log(this)
    this.keyWords = document.querySelector('#keyWords');
    this.node = e.target;
    // this.nodeName = this.node.nodeName;
    if (e.target.nodeName === 'LI' || e.target.nodeName === 'li') {
      console.log(window.location.pathname)
      if (window.location.pathname !== '/index') this.router.navigate(['./index'])
      //搜索框置空
      this.keyWords.value = '';
      this.keywords = this.node.innerHTML;
      if (this.keywords === '全部文章') this.keywords = '';
      this.router.navigate(['./index'], { queryParams: { keyWords: this.keywords } })
      this.loadData(1, { keyWords: this.keywords })
    }

  }
  handleClickBtn() {
    this.search = true;
    this.router.navigate(['./index'], { queryParams: { keyWords: this.keyWords.value } })
    this.handleClickSearch(this.keyWords.value)
  }
  handleClickKeywords(e) {
    if (e.keyCode === 13) {
      this.search = true;
      this.router.navigate(['./index'], { queryParams: { keyWords: this.keyWords.value } })
      this.handleClickSearch(this.keyWords.value)
    }
  }
  ngAfterViewInit() {
    this.keyWords = document.querySelector('#keyWords');
    let btn = document.querySelector('.search');
    // btn.addEventListener('click',() => {
    //   this.search = true;
    //   this.router.navigate(['./index'],{queryParams:{keyWords:this.keyWords.value}})
    //   this.handleClickSearch(this.keyWords.value)
    // })
    btn.addEventListener('click', this.handleClickBtn, false)
    this.keyWords.addEventListener('keyup', this.handleClickKeywords, false)
    let ul = document.getElementsByClassName('ul')[0];
    ul.addEventListener('click', this.handleClickUl, false)

  }
  ngOnDestroy() {
    let ul = document.getElementsByClassName('ul')[0];
    ul.removeEventListener('click', this.handleClickUl, false)
    let btn = document.querySelector('.search');
    // btn.removeEventListener('click',() => {
    //   this.handleClickSearch(this.keyWords.value)
    // },false)
    btn.removeEventListener('click', this.handleClickBtn, false)
    // this.keyWords.removeEventListener('keyup',(e) => {
    //   if(e.keyCode===13){
    //     this.handleClickSearch(this.keyWords.value)
    //   }
    // },false)
    this.keyWords.removeEventListener('keyup', this.handleClickKeywords, false)
  }
  async handleClickSearch(keyWords) {
    try {
      if (this.search) this.currentPage = 1;
      await this.loadData(this.currentPage, { keyWords })
      this.search = false;
    } catch (error) {
      console.log(error);
    }
  }
}
