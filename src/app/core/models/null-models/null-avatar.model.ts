import { FileInterface } from '../../interfaces/client/file.interface';

export class NullAvatarModel implements FileInterface {
  public id: null;
  public type: string;
  public mimeType: string;
  public url: string;
  public urlSmall: string;
  public urlMedium: string;
  public urlLarge: string;

  constructor() {
    this.id = null;
    this.type = null;
    this.mimeType = null;
    this.url = this.getAvatarUrl();
    this.urlSmall = this.getAvatarUrl();
    this.urlMedium = this.getAvatarUrl();
    this.urlLarge = this.getAvatarUrl();
  }

  private getAvatarUrl(): string {
    return '/assets/images/null-avatar.svg';
  }
}
