import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { IndexComponent as  AdminIndex } from './routes/admin/index/index.component'
import { IndexComponent } from './routes/index/index.component'
import { CanAuthProvide } from './services/guard/can-auth.provide'
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index',
    component:IndexComponent, 
    children:[
      {path: '',loadChildren: './routes/index/article/article.module#ArticleModule'},
      {path: 'detail',loadChildren: './routes/index/detail/detail.module#DetailModule'}
    ]  
  },
  {
    path: 'admin/index',
    canActivate:[CanAuthProvide],    /*配置路由守卫*/
    component: AdminIndex,
    children: [
      { path: 'add', loadChildren: './routes/admin/index/first/first.module#FirstModule' },
      { path: 'get', loadChildren: './routes/admin/index/second/second.module#SecondModule'},
      { path: 'user-manage', loadChildren: './routes/admin/index/user-manage/user-manage.module#UserManageModule'},

    ]
  },
  { path:'details', loadChildren:'./routes/admin/details/details.module#DetailsModule' },
  { path:'reg', children:[{path:'', loadChildren:'./routes/reg/reg.module#RegModule'}] },
  { path: '**', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
