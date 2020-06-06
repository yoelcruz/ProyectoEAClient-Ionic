import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginGoogleFacebookPage } from './login-google-facebook.page';

describe('LoginGoogleFacebookPage', () => {
  let component: LoginGoogleFacebookPage;
  let fixture: ComponentFixture<LoginGoogleFacebookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginGoogleFacebookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginGoogleFacebookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
