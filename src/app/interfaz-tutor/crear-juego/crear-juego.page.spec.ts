import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';

import { CrearJuegoPage } from './crear-juego.page';

describe('CrearJuegoPage', () => {
  let component: CrearJuegoPage;
  let fixture: ComponentFixture<CrearJuegoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearJuegoPage ],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, NgForm]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearJuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
