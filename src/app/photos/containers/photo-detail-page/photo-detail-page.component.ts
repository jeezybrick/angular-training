import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from '../../services/photos.service';
import { PhotoInterface } from '@app/photos/interfaces/photo.interface';

@Component({
  selector: 'my-photo-detail-page',
  templateUrl: './photo-detail-page.component.html',
  styleUrls: ['./photo-detail-page.component.scss'],
})
export class PhotoDetailPageComponent implements OnInit {
  public photo$: Observable<PhotoInterface>;

  constructor(private photosService: PhotosService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.photo$ = this.photosService.getDetail(this.activatedRoute.snapshot.params.photoId);
  }
}
