import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTimerCreatorComponent } from './audio-timer-creator.component';

describe('AudioTimerCreatorComponent', () => {
  let component: AudioTimerCreatorComponent;
  let fixture: ComponentFixture<AudioTimerCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioTimerCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTimerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
