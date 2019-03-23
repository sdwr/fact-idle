import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPendingSongComponent } from './spotify-pending-song.component';

describe('SpotifyPendingSongComponent', () => {
  let component: SpotifyPendingSongComponent;
  let fixture: ComponentFixture<SpotifyPendingSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyPendingSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyPendingSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
