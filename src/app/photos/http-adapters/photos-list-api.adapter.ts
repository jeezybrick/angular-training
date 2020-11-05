import { Injectable } from '@angular/core';
import { AdapterInterface } from '@core/http-adapters/adapter.interface';
import { ApiPhotoInterface } from '../interfaces/api-photo.interface';
import { PhotoInterface } from '../interfaces/photo.interface';
import { PhotoDetailApiAdapter } from './photo-detail-api.adapter';

@Injectable()
export class PhotosListApiAdapter implements AdapterInterface<PhotoInterface[]> {
  constructor(private photoDetailApiAdapter: PhotoDetailApiAdapter) {}

  public adapt(data: ApiPhotoInterface[]): PhotoInterface[] {
    return data.map(item => this.photoDetailApiAdapter.adapt(item));
  }
}
