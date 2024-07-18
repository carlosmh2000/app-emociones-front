import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JuegoBuscarIntrusoPage } from './juego-buscar-intruso.page';

describe('JuegoBuscarIntrusoPage', () => {
  let component: JuegoBuscarIntrusoPage;
  let fixture: ComponentFixture<JuegoBuscarIntrusoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoBuscarIntrusoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegoBuscarIntrusoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
