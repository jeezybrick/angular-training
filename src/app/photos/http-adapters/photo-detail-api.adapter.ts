import { Injectable } from '@angular/core';
import { AdapterInterface } from '@core/http-adapters/adapter.interface';
import { PhotoInterface } from '../interfaces/photo.interface';
import { ApiPhotoInterface } from '../interfaces/api-photo.interface';

@Injectable()
export class PhotoDetailApiAdapter implements AdapterInterface<PhotoInterface> {

  public adapt(data: ApiPhotoInterface): PhotoInterface {
    return {
      id: data.id,
      albumId: data.albumId,
      title: data.title,
      url: data.url,
      thumbnailUrl: data.thumbnailUrl,
    };
  }
}
