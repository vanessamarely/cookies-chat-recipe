import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesChatComponent } from './cookies-chat.component';

describe('CookiesChatComponent', () => {
  let component: CookiesChatComponent;
  let fixture: ComponentFixture<CookiesChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
