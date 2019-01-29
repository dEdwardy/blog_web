import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login/login.service'
import { NzMessageService } from 'ng-zorro-antd'


@Component({
  selector: 'mpr-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  updateData:any;
  dataSet:any;
  constructor(private loginService:LoginService, public message:NzMessageService) { }
  async loadUserData(){
    this.dataSet = await this.loginService.getUser();
    console.log(this.dataSet)
  }
  async updateUser(id,power:number){
    this.updateData = await this.loginService.updateUser({id,power});
    if(this.updateData.success){
      this.message.success('操作成功')
    }else{
      this.message.warning('操作失败')
    }
    await this.loadUserData();
  }
  ngOnInit() {
    this.loadUserData();
  }

}
