import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstudioPage } from './estudio.page';

describe('EstudioPage', () => {
  let component: EstudioPage;
  let fixture: ComponentFixture<EstudioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
