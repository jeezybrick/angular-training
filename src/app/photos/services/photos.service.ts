import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiPhotoInterface } from '../interfaces/api-photo.interface';
import { PhotoDetailApiAdapter } from '../http-adapters/photo-detail-api.adapter';
import { PhotosListApiAdapter } from '../http-adapters/photos-list-api.adapter';
import { PhotoInterface } from '../interfaces/photo.interface';

@Injectable()
export class PhotosService {
  constructor(
    private http: HttpClient,
    private photosListApiAdapter: PhotosListApiAdapter,
    private photoDetailApiAdapter: PhotoDetailApiAdapter,
  ) {}

  public getList(): Observable<PhotoInterface[]> {
    return this.http.get<ApiPhotoInterface[]>('/photos?_start=0&_limit=100').pipe(map((data) => this.photosListApiAdapter.adapt(data)));
  }

  public getDetail(photosId: number): Observable<PhotoInterface> {
    return this.http.get<ApiPhotoInterface>(`/photos/${photosId}`).pipe(map((data) => this.photoDetailApiAdapter.adapt(data)));
  }
}
