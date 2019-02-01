import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBuildingsComponent } from './home-buildings.component';

describe('HomeBuildingsComponent', () => {
  let component: HomeBuildingsComponent;
  let fixture: ComponentFixture<HomeBuildingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBuildingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
