import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtilceService } from '../../../services/article/artilce.service'
import { pathHead } from 'src/app/config';

@Component({
  selector: 'mpr-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  data: any;
  item :any={ };

  constructor(private route: ActivatedRoute, private articleService: ArtilceService) {

  }

  id: any;
  pathFilter(value:string){
    return pathHead + value;
  }
  async loadDetail() {
    //console.log(this.route.snapshot.queryParamMap.get('_id'));
    this.id = this.route.snapshot.queryParamMap.get('_id');
    try {
      this.data = await this.articleService.getArticle({ _id: this.id })
      console.log(this.data.data[0])
      this.item = this.data.data[0];
    } catch (error) {
      console.log(error)
    }
  }
  ngOnInit() {
    this.loadDetail()
  }

}