import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MysubscriptionsPage } from './mysubscriptions.page';

describe('MysubscriptionsPage', () => {
  let component: MysubscriptionsPage;
  let fixture: ComponentFixture<MysubscriptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysubscriptionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MysubscriptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
