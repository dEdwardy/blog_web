import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pathHead } from '../../../config'
import { ArtilceService } from '../../../services/article/artilce.service'

@Component({
  selector: 'mpr-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  data: any;
  item :any={ };

  constructor(private route: ActivatedRoute, private articleService: ArtilceService) {

  }

  id: any;
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
  /**
   *优化ngFor性能(根据indexDOM只重绘了修改和增加的项)
   *
   * @param {*} index
   * @param {*} item
   * @returns
   * @memberof DetailsComponent
   */
  trackByIndex(index, item){
    return index;
  }
  pathFilter(value:string){
    return pathHead+value
  }
  ngOnInit() {
    this.loadDetail()
  }

}