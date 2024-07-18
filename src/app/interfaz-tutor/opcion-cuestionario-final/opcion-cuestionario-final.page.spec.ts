import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpcionCuestionarioFinalPage } from './opcion-cuestionario-final.page';

describe('OpcionCuestionarioFinalPage', () => {
  let component: OpcionCuestionarioFinalPage;
  let fixture: ComponentFixture<OpcionCuestionarioFinalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionCuestionarioFinalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpcionCuestionarioFinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
