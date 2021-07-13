import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdoptComponent } from './pages/adopt/adopt.component';
import { DonateComponent } from './pages/donate/donate.component';
import { FriendComponent } from './pages/friend/friend.component';
import { PetComponent } from './pages/pet/pet.component';

const routes: Routes = [
  { path: 'pet', component: PetComponent},
  { path: 'friend', component: FriendComponent},
  { path: 'adopt', component: AdoptComponent},
  { path: 'donate', component: DonateComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
