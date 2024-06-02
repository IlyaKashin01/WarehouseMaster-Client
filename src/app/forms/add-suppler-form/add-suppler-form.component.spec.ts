import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplerFormComponent } from './add-suppler-form.component';

describe('AddSupplerFormComponent', () => {
  let component: AddSupplerFormComponent;
  let fixture: ComponentFixture<AddSupplerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSupplerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSupplerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
