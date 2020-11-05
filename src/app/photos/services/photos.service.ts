import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiPhotoInterface } from '@app/photos/interfaces/api-photo.interface';
import { PhotoDetailApiAdapter } from '@app/photos/http-adapters/photo-detail-api.adapter';
import { PhotosListApiAdapter } from '@app/photos/http-adapters/photos-list-api.adapter';
import { PhotoInterface } from '@app/photos/interfaces/photo.interface';

@Injectable()
export class PhotosService {

  constructor(@Inject(HttpClient) private http: HttpClient, private photosListApiAdapter: PhotosListApiAdapter, private photoDetailApiAdapter: PhotoDetailApiAdapter) { }

  public getList(): Observable<PhotoInterface[]> {
    return this.http
      .get<ApiPhotoInterface[]>('https://jsonplaceholder.typicode.com/photos?_start=0&_limit=100')
      .pipe(
        map(data => this.photosListApiAdapter.adapt(data)),
      );
  }

  public getDetail(photosId: number): Observable<PhotoInterface> {
    return this.http
      .get<ApiPhotoInterface>(`https://jsonplaceholder.typicode.com/photos/${photosId}`)
      .pipe(
        map(data => this.photoDetailApiAdapter.adapt(data)),
      );
  }
}
