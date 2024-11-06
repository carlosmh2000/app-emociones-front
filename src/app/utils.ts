import { ModalController } from '@ionic/angular';
import { GaleriaPage } from './interfaz-tutor/galeria/galeria.page';

export async function openGaleriaModal(modalCtrl: ModalController): Promise<any> {
  const modal = await modalCtrl.create({
    component: GaleriaPage,
    componentProps: {
      asignando: true
    },
    cssClass: 'addEjercicio'
  });

  await modal.present();
  const { data } = await modal.onDidDismiss();
  return data;
}
