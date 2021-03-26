import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MychannelsPage } from './mychannels.page';

describe('MychannelsPage', () => {
  let component: MychannelsPage;
  let fixture: ComponentFixture<MychannelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MychannelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MychannelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
