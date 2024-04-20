import {Component, ElementRef, ViewChild} from '@angular/core';
import {ModalController, ToastController} from "@ionic/angular";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.page.html',
  styleUrls: ['./add-phone.page.scss'],
})
export class AddPhonePage  {
  imageChangedEvent: any;
  @ViewChild("imagePicker") imagePicker: ElementRef | undefined;
  phoneForm: FormGroup;
   phone: any = JSON.parse(localStorage.getItem("phoneToUpdate"));
  indexToUpdate: string = localStorage.getItem("indexToUpdate");
  constructor(private modalCtrl: ModalController,
              private fb: FormBuilder,
              private toastCtrl: ToastController) {

    if (this.phone) {
      this.createForm(this.phone);
    } else {
      this.createForm({});
    }
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: "Téléphone enregistré avec succès",
      duration: 3000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  createForm(phone: any) {
    this.phoneForm = this.fb.group({
      name:[phone?.name, Validators.required],
      description:[phone?.description, Validators.required],
      photo:[phone?.photo, Validators.required],
    });
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  pickImage() {
    this.imagePicker?.nativeElement.click();
  }
  imageCropped(event: ImageCroppedEvent) {
    this.blobToBase64(event.blob).then((result) => {
      this.phoneForm.patchValue({
        photo: result
      });
    });
  }

  savePhone() {
    if (this.phoneForm.valid) {
      let locaPhone: any[] = JSON.parse(localStorage.getItem("phones"));
      if (this.phone && this.indexToUpdate) {
        locaPhone[Number(this.indexToUpdate)].name = this.phoneForm.get('name').value;
        locaPhone[Number(this.indexToUpdate)].description = this.phoneForm.get('description').value;
        locaPhone[Number(this.indexToUpdate)].photo = this.phoneForm.get('photo').value;

        setTimeout(() => {
          localStorage.setItem("phones", JSON.stringify(locaPhone));
          this.modalCtrl.dismiss(1);
          this.showToast();
        }, 500);
      } else {
        if (locaPhone) {
          locaPhone.push(this.phoneForm.value);
          setTimeout(() => {
            localStorage.setItem("phones", JSON.stringify(locaPhone));
            this.modalCtrl.dismiss(1);
            this.showToast();
          }, 500)
        } else {
          let newLocalPhone: any[] = [];
          newLocalPhone.push(this.phoneForm.value);
          localStorage.setItem("phones", JSON.stringify(newLocalPhone));
          this.modalCtrl.dismiss(1);
          this.showToast();
        }
      }
    }
  }

  goBack() {
    this.modalCtrl.dismiss();
  }
}
