import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreguntasBuscarIntrusoPage } from './preguntas-buscar-intruso.page';

describe('PreguntasBuscarIntrusoPage', () => {
  let component: PreguntasBuscarIntrusoPage;
  let fixture: ComponentFixture<PreguntasBuscarIntrusoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntasBuscarIntrusoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntasBuscarIntrusoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
