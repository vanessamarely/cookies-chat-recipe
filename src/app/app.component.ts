import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookiesChatComponent } from './cookies-chat/cookies-chat.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CookiesChatComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Cookies Recipe Chat';
}
