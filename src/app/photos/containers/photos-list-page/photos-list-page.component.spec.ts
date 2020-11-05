import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosListPageComponent } from './photos-list-page.component';

describe('PhotosListPageComponent', () => {
  let component: PhotosListPageComponent;
  let fixture: ComponentFixture<PhotosListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
