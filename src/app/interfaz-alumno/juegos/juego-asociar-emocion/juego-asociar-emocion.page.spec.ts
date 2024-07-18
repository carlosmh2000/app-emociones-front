import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JuegoAsociarEmocionPage } from './juego-asociar-emocion.page';

describe('JuegoAsociarEmocionPage', () => {
  let component: JuegoAsociarEmocionPage;
  let fixture: ComponentFixture<JuegoAsociarEmocionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegoAsociarEmocionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegoAsociarEmocionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
