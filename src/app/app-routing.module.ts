import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './routes/login/login.component'
import { IndexComponent as  AdminIndex } from './routes/admin/index/index.component'
import { DetailsComponent } from './routes/admin/details/details.component'
import { RegComponent } from './routes/reg/reg.component'
import { NotFoundComponent } from './routes/not-found/not-found.component'
import { IndexComponent } from './routes/index/index.component'
const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component:IndexComponent, pathMatch: 'full'  },
  { path: 'login', component: LoginComponent},
  {
    path: 'admin/index',
    // canActivate:[AuthGuard],    /*配置路由守卫*/
    // canActivateChild: [AuthGuard],
    component: AdminIndex,
    children: [
      { path: 'add', loadChildren: './routes/admin/index/first/first.module#FirstModule' },
      { path: 'get', loadChildren: './routes/admin/index/second/second.module#SecondModule' }
    ]
  },
  { path:'details', component: DetailsComponent },
  { path:'reg', component:RegComponent },
  { path:'notfound', component: NotFoundComponent },
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
