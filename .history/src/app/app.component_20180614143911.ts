import { Component } from '@angular/core';
import { Online } from 'online-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  const statusChecker = Online();
 
  const callback = (status) => {
    if (status === true) {
      console.info('Connected!')
    } else {
      console.warn('Disconnected!')
    }
  }
 
  statusChecker.onUpdateStatus(callback);
}
