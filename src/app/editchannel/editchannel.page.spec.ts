import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditchannelPage } from './editchannel.page';

describe('EditchannelPage', () => {
  let component: EditchannelPage;
  let fixture: ComponentFixture<EditchannelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditchannelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditchannelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
