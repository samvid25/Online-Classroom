import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePictureDialogComponent } from './change-picture-dialog.component';

describe('ChangePictureDialogComponent', () => {
  let component: ChangePictureDialogComponent;
  let fixture: ComponentFixture<ChangePictureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePictureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePictureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
