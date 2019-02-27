import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySongSearchComponent } from './spotify-song-search.component';

describe('SpotifySongSearchComponent', () => {
  let component: SpotifySongSearchComponent;
  let fixture: ComponentFixture<SpotifySongSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifySongSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifySongSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
