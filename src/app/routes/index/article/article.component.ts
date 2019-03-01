import { Component, OnInit } from '@angular/core';
import { ArtilceService } from '../../../services/article/artilce.service'
import { Router, ActivatedRoute } from '@angular/router'
import { pathHead } from '../../../config'
import { NzMessageService } from 'ng-zorro-antd'
@Component({
  selector: 'mpr-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  flag=false;
  lastDate:any= null;
  date: any;
  startX: any;
  startY: any;
  endX: any;
  endY: any;
  node: any;
  nodeName: any;
  totalSearch: any;
  resDataSearch;
  //搜索框的关键词
  keyWords: any;
  //ul关键词
  keywords: string = '';
  data = [];
  resData: any;
  total: any;
  pageNumber: number;
  search: Boolean = false;
  currentPage: number = 1;
  constructor(
    public articleService: ArtilceService,
    public router: Router,
    private route: ActivatedRoute,
    public message: NzMessageService
  ) {
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
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
      let { data } = this.resData;
      console.log(data)
      this.data = [...this.data, ...data]
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
  //获得角度
  getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
  };
  //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
  getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;
    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
      return result;
    }
    var angle = this.getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
      result = 1;
    } else if (angle > 45 && angle < 135) {
      result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
      result = 3;
    } else if (angle >= -45 && angle <= 45) {
      result = 4;
    }
    return result;
  }
  //手指接触屏幕
  handleTouchStart(e) {
    this.startX = e.changedTouches[0].pageX;
    this.startY = e.changedTouches[0].pageY;
  }
  //手指离开屏幕
  async handleTouchEnd(e) {
    this.endX = e.changedTouches[0].pageX;
    this.endY = e.changedTouches[0].pageY;
    let direction = this.getDirection(this.startX, this.startY, this.endX, this.endY);
    switch (direction) {
      case 0:
        console.log("未滑动！");
        break;
      case 1:
        console.log("上拉！")
        if (this.data.length === this.pageNumber) {
          var date = new Date().getTime();
          if (this.lastDate||this.flag) {
            console.log(date)
            console.log(this.lastDate)
            if (date - this.lastDate <= 3000) {
              console.log('未超过3s')
              return;
            }
          }
          this.lastDate = date;
          this.flag = true;
          this.message.warning('我可是有底线的')
        } else {
          console.log('数据加载中')
          this.currentPage = this.currentPage + 1;
          const id = this.message.loading('加载中...', { nzDuration: 0 }).messageId;
          await this.loadData(this.currentPage, { keyWords: this.keywords });
          this.message.remove(id);
        }
        break;
      case 2:
        console.log("向下！")
        break;
      case 3:
        console.log("向左！")
        break;
      case 4:
        console.log("向右！")
        break;
      default:
        break;
    }
  }
  ngAfterViewInit() {
    document.addEventListener('touchstart', this.handleTouchStart, false);
    document.addEventListener('touchend', this.handleTouchEnd, false);
    this.keyWords = document.querySelector('#keyWords');
    let btn = document.querySelector('.search');
    btn.addEventListener('click', this.handleClickBtn, false)
    this.keyWords.addEventListener('keyup', this.handleClickKeywords, false)
    let ul = document.getElementsByClassName('ul')[0];
    ul.addEventListener('click', this.handleClickUl, false)

  }
  ngOnDestroy() {
    document.removeEventListener('touchstart', this.handleTouchStart, false);
    document.removeEventListener('touchend', this.handleTouchEnd, false);
    let ul = document.getElementsByClassName('ul')[0];
    ul.removeEventListener('click', this.handleClickUl, false)
    let btn = document.querySelector('.search');
    btn.removeEventListener('click', this.handleClickBtn, false)
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
