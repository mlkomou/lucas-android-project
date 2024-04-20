import { Component } from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {AddPhonePage} from "../add-phone/add-phone.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  phones: any[] = JSON.parse(localStorage.getItem("phones"));

  constructor(private modalCtrl: ModalController,
              private alertCtrl: AlertController) {}

  async goToAdd(phone: any, index: number) {
    if (phone) {
      localStorage.setItem("phoneToUpdate", phone ? JSON.stringify(phone) : null);
      if (index != 0) {
        localStorage.setItem("indexToUpdate", index ? index.toString() : null);
      } else {
        localStorage.setItem("indexToUpdate", "0");
      }
    }
    const modal = await this.modalCtrl.create({
      component: AddPhonePage,
    });
    await modal.present();
    modal.onDidDismiss().then((result) => {
      if (result.data == 1) {
        this.phones = JSON.parse(localStorage.getItem("phones"));
      }

      if (localStorage.getItem("phoneToUpdate")) {
        localStorage.removeItem("phoneToUpdate");
        localStorage.removeItem("indexToUpdate");
      }
    });
  }

  async showDeleteAlert(index: number) {
    const alert = await this.alertCtrl.create({
      header: "Voulez-vous supprimer ce téléphone ?",
      buttons: [
        {
          text: "Non"
        },
        {
          text: "Oui",
          handler: () => {
            this.phones.splice(index, 1);
            setTimeout(() => {
              localStorage.setItem("phones", JSON.stringify(this.phones));
            }, 500);
          }
        }
      ]
    });
    await alert.present();
  }
}
