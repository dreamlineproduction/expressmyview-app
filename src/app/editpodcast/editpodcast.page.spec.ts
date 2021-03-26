import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditpodcastPage } from './editpodcast.page';

describe('EditpodcastPage', () => {
  let component: EditpodcastPage;
  let fixture: ComponentFixture<EditpodcastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpodcastPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditpodcastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
