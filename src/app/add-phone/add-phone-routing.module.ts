import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPhonePage } from './add-phone.page';

const routes: Routes = [
  {
    path: '',
    component: AddPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPhonePageRoutingModule {}
