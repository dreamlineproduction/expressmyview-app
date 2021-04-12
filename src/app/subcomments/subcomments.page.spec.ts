import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubcommentsPage } from './subcomments.page';

describe('SubcommentsPage', () => {
  let component: SubcommentsPage;
  let fixture: ComponentFixture<SubcommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubcommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
