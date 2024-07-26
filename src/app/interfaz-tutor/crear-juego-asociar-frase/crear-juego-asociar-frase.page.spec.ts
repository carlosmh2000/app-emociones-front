import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearJuegoAsociarFrasePage } from './crear-juego-asociar-frase.page';

describe('CrearJuegoAsociarFrasePage', () => {
  let component: CrearJuegoAsociarFrasePage;
  let fixture: ComponentFixture<CrearJuegoAsociarFrasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearJuegoAsociarFrasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
