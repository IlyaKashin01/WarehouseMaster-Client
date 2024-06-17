import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInfoFormComponent } from './group-info-form.component';

describe('GroupInfoFormComponent', () => {
  let component: GroupInfoFormComponent;
  let fixture: ComponentFixture<GroupInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
