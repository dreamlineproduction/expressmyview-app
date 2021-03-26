import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatechannelsPage } from './createchannels.page';

describe('CreatechannelsPage', () => {
  let component: CreatechannelsPage;
  let fixture: ComponentFixture<CreatechannelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatechannelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatechannelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
