import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ArtilceService } from '../../../../services/article/artilce.service'
import { NzModalService,NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'mpr-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  total: any;
  pageNumber: number;
  
  constructor(private articleService: ArtilceService, public router: Router, public modalService: NzModalService,public message:NzMessageService) {
    
  }
  ngOnInit(): void {
    this.loadPageNumber();
    this.loadData();
  }
  data: any;

  handleClickDelete(e, id) {
    e.stopPropagation();
    this.modalService.confirm({
      nzTitle: 'Are you sure to delete this item?',
      nzContent: 'Are you sure to delete this item?',
      nzOnOk: () => {
        this.articleService.deleteArticle({params:{ id }})
          .subscribe((res:DeleteResponse) => {
            if(res.n===1){
              /**
               *@param n 受影响的条数(即删除的条数)
               */
              this.message.success('删除成功！')
              this.loadPageNumber();
              this.loadData();
            }else{
              this.message.error('删除失败！')
            }
          })
      }
    });
  }
  handleClick(item) {
    //console.log(item)
    this.router.navigate(['details'], { queryParams: { '_id': item._id } });

  }
  loadPageNumber() {
    this.articleService.getArticle( { count: 1 } )
      .subscribe(res => {
        this.total = res;
        this.pageNumber = this.total.length;
        //console.log(this.pageNumber)
      })
  }
  loadData(page: number = 1): void {
    //console.log(page)
    this.articleService.getArticle({ skip: (page - 1) * 10, limit: 10 })
      .subscribe((res:GetResponse) => {
        this.data = res.data;
        this.data.map(item => {
          item.label = item.label.split(',').join(' & ');
          //console.log(item.label)
        })
      });
  }
}
interface DeleteResponse{
  n :number,
  ok : number
}
interface GetResponse{
  data: any
}