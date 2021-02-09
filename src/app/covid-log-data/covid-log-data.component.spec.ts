import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidLogDataComponent } from './covid-log-data.component';

describe('CovidLogDataComponent', () => {
  let component: CovidLogDataComponent;
  let fixture: ComponentFixture<CovidLogDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidLogDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidLogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
