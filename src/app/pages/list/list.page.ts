import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController, ToastController } from '@ionic/angular';

import { PlaylistAddPage } from '../playlist-add/playlist-add.page';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];

  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public toastController: ToastController
    ) {
    for (let i = 1; i < 26; i++) {
      this.items.push({
        title: 'Track ' + i,
        note: 'This is track #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  onRenderItems(event) {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const draggedItem = this.items.splice(event.detail.from, 1)[0];
    this.items.splice(event.detail.to, 0, draggedItem);
    // this.listItems = reorderArray(this.listItems, event.detail.from, event.detail.to);
    event.detail.complete();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PlaylistAddPage,
      componentProps: { value: 123 }
    });
    modal.onDidDismiss().then(data => {
      this.presentToast('Song added to playlist.');
    });
    return await modal.present();
  }

  async presentToast(data) {
    const toast = await this.toastController.create({
      message: data,
      position: 'bottom',
      color: 'opendj',
      duration: 2000
    });
    toast.present();
  }

  async presentActionSheet(data) {
    const actionSheet = await this.actionSheetController.create({
      header: data,
      buttons: [
        {
          text: 'Play (preview mode)',
          icon: 'arrow-dropright-circle',
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Like',
          icon: 'heart',
          handler: () => {
            console.log('Favorite clicked');
            this.presentToast('Your Like has been saved.');
          }
        }, {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
            this.presentToast('You have shared the song');
          }
        }, {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
            this.presentToast('You have deleted the song.');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
