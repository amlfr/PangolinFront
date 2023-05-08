import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social.component';
import { FriendsComponent } from '../friends/friends.component';
import { UsersComponent } from '../users/users.component';
import { SelectorClassComponent } from '../selector-role/selector-role.component';

@NgModule({
  declarations: [
    SocialComponent,
    FriendsComponent,
    UsersComponent,
    SelectorClassComponent,
  ],
  imports: [CommonModule],
})
export class SocialModule {}
