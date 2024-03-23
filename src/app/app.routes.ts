import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { NgModule } from '@angular/core';
import { ReviewComponent } from './components/review/review.component';
import { BookComponent } from './components/book/book.component';
import { CopounComponent } from './components/copoun/copoun.component';
import { CategoryComponent } from './components/category/category.component';
import { ChartComponent } from './components/chart/chart.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { MessageComponent } from './components/message/message.component';

export const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'book', component: BookComponent },
  { path: 'copoun', component: CopounComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'chart', component: ChartComponent },

  { path: 'login', component: LoginComponent },
  { path: 'order', component: OrderComponent },

  { path: 'message', component: MessageComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
