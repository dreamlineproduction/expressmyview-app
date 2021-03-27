import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyMediasPage } from './my-medias.page';

describe('MyMediasPage', () => {
  let component: MyMediasPage;
  let fixture: ComponentFixture<MyMediasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMediasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMediasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
