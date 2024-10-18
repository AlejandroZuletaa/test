import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenModalsComponent } from './open-modals.component';

describe('OpenModalsComponent', () => {
  let component: OpenModalsComponent;
  let fixture: ComponentFixture<OpenModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenModalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
