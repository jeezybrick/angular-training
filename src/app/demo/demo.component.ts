import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'my-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/close.svg'));

    iconRegistry.addSvgIcon('user', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/user.svg'));

    iconRegistry.addSvgIcon('thumb-up', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/thumbup.svg'));
  }

  ngOnInit(): void {}
}
