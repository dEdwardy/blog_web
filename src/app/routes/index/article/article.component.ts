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
  lastDate: any = null;
  lastDate2: any = null;
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
    window.scroll(0, 0);
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
      this.data = data;
      console.log(this.data)
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
    await this.loadData(this.currentPage, { keyWords: this.keywords });
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
    await this.loadData(this.currentPage, { keyWords: this.keywords });
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
      this.data = [];
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
    if (Math.abs(angy) > Math.abs(angx) && angy < 0) {
      result = 1;
    } else if (Math.abs(angy) > Math.abs(angx) && angy > 0) {
      result = 2;
    } else if (Math.abs(angx) > Math.abs(angy) && angx < 0) {
      result = 3;
    } else if (Math.abs(angx) > Math.abs(angy) && angx > 0) {
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
        //若最后一项不在可视区则跳出
        let itemsLength = document.getElementsByClassName('item').length;
        let lastItem = document.getElementsByClassName('item')[itemsLength - 1];
        if (!this.checkItemISInsight(lastItem)) return;
        var date = new Date().getTime();
        if (this.lastDate) {
          console.log(date)
          console.log(this.lastDate)
          if (date - this.lastDate <= 3000) {
            this.lastDate = date;
            console.log('未超过3s')
            return;
          }
        }
        this.lastDate = date;
        if (this.data.length < 10 || (this.currentPage + 1) * 10 < this.pageNumber) {
          this.message.warning('我可是有底线的')
        } else {
          console.log('数据加载中')
          this.currentPage = this.currentPage + 1;
          const id = this.message.loading('加载中...', { nzDuration: 0 }).messageId;
          await this.loadData(this.currentPage, { keyWords: this.keywords });
          this.message.remove(id);
          let header = document.getElementsByTagName('header')[0];
          let height = header.scrollHeight;
          window.scrollTo(0, height);
        }
        break;
      case 2:
        console.log("向下！")
        //若第一项不在可视区则跳出
        let firstItem = document.getElementsByClassName('item')[0];
        if (!this.checkItemISInsight(firstItem)) return;
        var date = new Date().getTime();
        if (this.lastDate2) {
          console.log(date)
          console.log(this.lastDate2)
          if (date - this.lastDate2 <= 3000) {
            console.log('未超过3s')
            this.lastDate2 = date;
            return;
          }
        }
        this.lastDate2 = date;
        this.currentPage = 1;
        const id = this.message.loading('加载中...', { nzDuration: 0 }).messageId;
        await this.loadData(this.currentPage, { keyWords: this.keywords });
        this.message.remove(id);
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
    // let list = document.getElementsByClassName('list')[0]
    document.addEventListener('touchstart', this.handleTouchStart, false);
    document.addEventListener('touchend', this.handleTouchEnd, false);
    this.keyWords = document.querySelector('#keyWords');
    let btn = document.querySelector('.search');
    btn.addEventListener('click', this.handleClickBtn, false)
    this.keyWords.addEventListener('keyup', this.handleClickKeywords, false)
    let ul = document.getElementsByClassName('ul')[0];
    ul.addEventListener('click', this.handleClickUl, true)

  }
  ngOnDestroy() {
    // let list = document.getElementsByClassName('list')[0]
    document.removeEventListener('touchstart', this.handleTouchStart, false);
    document.removeEventListener('touchend', this.handleTouchEnd, false);
    let ul = document.getElementsByClassName('ul')[0];
    ul.removeEventListener('click', this.handleClickUl, true)
    let btn = document.querySelector('.search');
    btn.removeEventListener('click', this.handleClickBtn, false)
    this.keyWords.removeEventListener('keyup', this.handleClickKeywords, false)
  }
  /**
   *判断最后一个Item是否Insight,若在可视区返回true反之false
   *
   * @memberof ArticleComponent
   */
  checkItemISInsight(element): Boolean {
    if (this.getElementTopLeft(element).top + element.clientHeight > window.pageYOffset && window.pageYOffset + window.innerHeight > this.getElementTopLeft(element).top) {
      console.log('可见')
      return true
    } else {
      console.log('不可见')
      return false;
    }
  }
  getElementTopLeft(obj) {
    var top = 0;
    var left = 0;
    while (obj) {
      top += obj.offsetTop;
      left += obj.offsetLeft;
      obj = obj.offsetParent;
    }
    return { top: top, left: left };
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
