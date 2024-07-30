import { Routes } from '@angular/router';
import { CookiesChatComponent } from './cookies-chat/cookies-chat.component';

export const routes: Routes = [
    { path: '**', component: CookiesChatComponent }
];
