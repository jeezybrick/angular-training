import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'my-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event): boolean {
  //   return false;
  // }
}
