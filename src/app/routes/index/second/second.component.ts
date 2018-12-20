import { Component, OnInit } from '@angular/core';
import { ArtilceService } from '../../../services/article/artilce.service'
 
@Component({
  selector: 'mpr-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {
  total:any;
  pageNumber:number;
  constructor(private articleService:ArtilceService) {
    
   }
  ngOnInit(): void {
    this.loadPageNumber();
    this.loadData();
  }
  data: any;

  handleClick(item){
    console.log(item)
    //this.articleService.getArticle()
  }
  loadPageNumber(){
    this.articleService.getArticle({params:{count:1}})
      .subscribe(res => {
        this.total = res;
        this.pageNumber =this.total.length;
        console.log(this.pageNumber)
      })
  }
  loadData(page: number=1): void {
    console.log(page)
    this.articleService.getArticle({params:{skip:(page-1)*10,limit:10}})
      .subscribe(res => {
        this.data = res;
        this.data.map(item => {
          item.label=item.label.split(',').join(' & ');
          console.log(item.label)
        })
      });
  }
}