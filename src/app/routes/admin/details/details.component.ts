import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtilceService } from '../../../services/article/artilce.service'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd'
@Component({
  selector: 'mpr-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  data:any;
  title:string;
  label:string;
  content:string;
  comment:any;

  constructor(private route: ActivatedRoute,private articleService: ArtilceService) {
    
   }
   id:any;
  loadDetail() {
    console.log(this.route.snapshot.queryParamMap.get('_id'));
    this.id = this.route.snapshot.queryParamMap.get('_id');
    this.articleService.getArticle({ _id:this.id })
      .subscribe((res:GetResponse) =>{
        console.log(res.data[0]);
        this.title =res.data[0].title;
        this.label =res.data[0].label;
        this.content =res.data[0].content;
        this.comment =res.data[0].comment;
        console.log(this.title)
        console.log(this.label)
        console.log(this.content)
        console.log(this.comment)
      });
  }
  ngOnInit() {
    this.loadDetail()
  }

}
interface GetResponse{
  data:any
}