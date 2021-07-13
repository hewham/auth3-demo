import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowPage } from './how.page';

const routes: Routes = [
  {
    path: '',
    component: HowPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HowPageRoutingModule {}
