import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySongSelectorComponent } from './spotify-song-selector.component';

describe('SpotifySongSelectorComponent', () => {
  let component: SpotifySongSelectorComponent;
  let fixture: ComponentFixture<SpotifySongSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifySongSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifySongSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
