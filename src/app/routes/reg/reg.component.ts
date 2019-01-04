import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mpr-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit {
  now :any=Date.now();
  status=true;
  ngOnInit(){}
  public changeStatus(){
    this.status=!this.status;
  }
  constructor() {
  }
}