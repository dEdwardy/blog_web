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
        this.router.navigate(['admin/index/add']);
        break;
      case 'get':
        this.router.navigate(['admin/index/get']);
        break;
      case 'user-manage':
        this.router.navigate(['admin/index/user-manage']);
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
