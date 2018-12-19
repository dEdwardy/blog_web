import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './routes/login/login.component'
import { IndexComponent } from './routes/index/index.component'
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'index',
    component: IndexComponent,
    children: [
      { path: 'add', loadChildren: './routes/index/first/first.module#FirstModule' },
      { path: 'get', loadChildren: './routes/index/second/second.module#SecondModule' }
    ]
  },
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
