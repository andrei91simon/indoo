import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'Indoo Design';

    constructor(public auth: AuthService) {
    auth.handleAuthentication();
  }
}
