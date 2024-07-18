import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-confirmar-modo-tutor',
  templateUrl: './confirmar-modo-tutor.page.html',
  styleUrls: ['./confirmar-modo-tutor.page.scss'],
})
export class ConfirmarModoTutorPage implements OnInit {
  constructor(private screenOrientation : ScreenOrientation) { }

  ngOnInit() {
    this.lockToLandscape();
  }

  // Bloque la orientación en horizontal
  lockToLandscape(){
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

}
