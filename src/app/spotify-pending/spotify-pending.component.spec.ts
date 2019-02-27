import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPendingComponent } from './spotify-pending.component';

describe('SpotifyPendingComponent', () => {
  let component: SpotifyPendingComponent;
  let fixture: ComponentFixture<SpotifyPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
