import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JuegoAsociarFrasePage } from './juego-asociar-frase.page';

describe('JuegoAsociarFrasePage', () => {
  let component: JuegoAsociarFrasePage;
  let fixture: ComponentFixture<JuegoAsociarFrasePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoAsociarFrasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegoAsociarFrasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
