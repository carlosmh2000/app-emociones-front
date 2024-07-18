import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearJuegoAsociarImagenPage } from './crear-juego-asociar-imagen.page';

describe('CrearJuegoAsociarImagenPage', () => {
  let component: CrearJuegoAsociarImagenPage;
  let fixture: ComponentFixture<CrearJuegoAsociarImagenPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearJuegoAsociarImagenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearJuegoAsociarImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
