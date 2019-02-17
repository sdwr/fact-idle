import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingTileComponent } from './building-tile.component';

describe('BuildingTileComponent', () => {
  let component: BuildingTileComponent;
  let fixture: ComponentFixture<BuildingTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildingTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
