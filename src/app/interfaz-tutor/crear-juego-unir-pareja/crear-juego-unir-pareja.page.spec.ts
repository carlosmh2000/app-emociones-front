import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearJuegoUnirParejaPage } from './crear-juego-unir-pareja.page';

describe('CrearJuegoUnirParejaPage', () => {
  let component: CrearJuegoUnirParejaPage;
  let fixture: ComponentFixture<CrearJuegoUnirParejaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearJuegoUnirParejaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearJuegoUnirParejaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
