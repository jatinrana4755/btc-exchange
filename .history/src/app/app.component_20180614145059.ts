import { Component } from '@angular/core';
import Online from 'online-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  const options = {
    url: 'favicon.ico',  // Link on your site. Cross-domain requests not supported
    delay: 2,            // Delay between checking in seconds
    startOnload: true    // Start checking after page load
  }
  const statusChecker = Online(this.options);
 
  const callback = (status) => {
    if (status === true) {
      console.info('Connected!')
    } else {
      console.warn('Disconnected!')
    }
  }
 
  statusChecker.onUpdateStatus(callback);
}
