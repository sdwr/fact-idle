import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySongComponent } from './spotify-song.component';

describe('SpotifySongComponent', () => {
  let component: SpotifySongComponent;
  let fixture: ComponentFixture<SpotifySongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifySongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifySongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
