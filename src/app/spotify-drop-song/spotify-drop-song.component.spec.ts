import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyDropSongComponent } from './spotify-drop-song.component';

describe('SpotifyDropSongComponent', () => {
  let component: SpotifyDropSongComponent;
  let fixture: ComponentFixture<SpotifyDropSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyDropSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyDropSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
