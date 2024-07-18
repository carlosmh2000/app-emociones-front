import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearJuegoBuscarIntrusoPage } from './crear-juego-buscar-intruso.page';

describe('CrearJuegoBuscarIntrusoPage', () => {
  let component: CrearJuegoBuscarIntrusoPage;
  let fixture: ComponentFixture<CrearJuegoBuscarIntrusoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearJuegoBuscarIntrusoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearJuegoBuscarIntrusoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
