import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotosService } from '@app/photos/services/photos.service';
import { PhotoInterface } from '@app/photos/interfaces/photo.interface';

@Component({
  selector: 'my-photos-list-page',
  templateUrl: './photos-list-page.component.html',
  styleUrls: ['./photos-list-page.component.scss']
})
export class PhotosListPageComponent implements OnInit {
  public photos$: Observable<PhotoInterface[]>;

  constructor(private photosService: PhotosService) { }

  ngOnInit(): void {
    this.photos$ = this.photosService.getList();
  }

  public trackByFn(index: number, item: PhotoInterface): number {
    return item.id;
  }

}
