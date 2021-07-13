import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { PetComponent } from './pages/pet/pet.component';
import { DonateComponent } from './pages/donate/donate.component';
import { FriendComponent } from './pages/friend/friend.component';
import { AdoptComponent } from './pages/adopt/adopt.component';

@NgModule({
  declarations: [
    AppComponent,
    DonateComponent, 
    PetComponent, 
    FriendComponent, 
    AdoptComponent
  ],
  imports: [
    BrowserModule,    
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,    
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
