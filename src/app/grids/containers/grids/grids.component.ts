import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-grids',
  templateUrl: './grids.component.html',
  styleUrls: ['./grids.component.scss'],
})
export class GridsComponent implements OnInit {
  public arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {}

  ngOnInit(): void {}
}
