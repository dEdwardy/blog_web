import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ArtilceService } from '../../../../services/article/artilce.service'
import { NzModalService, NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'mpr-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  total: any;
  pageNumber: number;
  resData: any;
  deleteInfo: any;
  data: any;
  constructor(private articleService: ArtilceService, public router: Router, public modalService: NzModalService, public message: NzMessageService) {

  }
  ngOnInit(): void {
    this.loadData();
  }

  handleClickDelete(e, id) {
    e.stopPropagation();
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete this item?',
      nzContent: 'Are you sure to delete this item?',
      nzOnOk: async () => {
        try {
          this.deleteInfo = await this.articleService.deleteArticle({ params: { id } });
          if (this.deleteInfo.n === 1) {               //n 受影响的条数(即删除的条数)
            this.message.success('删除成功！')
            this.loadData();
          } else {
            this.message.error('删除失败！')
          }
        } catch (error) {
          console.log(error)
        }
      }
    });
  }
  handleClick(item) {
    //console.log(item)
    this.router.navigate(['details'], { queryParams: { '_id': item._id } });

  }
  async loadData(page: number = 1) {
    try {
      this.resData = await this.articleService.getArticle({ skip: (page - 1) * 10, limit: 10 });
      this.pageNumber = this.resData.length;
      this.data = this.resData.data;
      this.data.data.map(item => {
        item.label = item.label.split(',').join(' & ');
      })
    } catch (error) {
      console.log(error)
    }
  }
}