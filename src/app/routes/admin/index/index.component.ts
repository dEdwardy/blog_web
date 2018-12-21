import { Component, OnInit ,ViewChild } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'mpr-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  isCollapsed = 0;
  public routeTo(type){
    console.log(type);
    switch(type){
      case 'add':
        this.router.navigate(['index/add']);
        break;
      case 'get':
        this.router.navigate(['index/get']);
        break;
      default:
        break;
    }
  }
  constructor(private router:Router) { 
  }
  ngOnInit() {
  }
  
}
