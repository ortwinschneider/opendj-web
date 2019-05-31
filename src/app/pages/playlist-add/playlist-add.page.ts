import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.page.html',
  styleUrls: ['./playlist-add.page.scss'],
})
export class PlaylistAddPage implements OnInit {

  queryText = '';
  show = false;
  items: Array<{ title: string; note: string; icon: string }> = [];
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

  constructor(public modalController: ModalController) {
    for (let i = 1; i < 26; i++) {
      this.items.push({
        title: 'Track ' + i,
        note: 'This is track #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
   }

  dismiss() {
    this.modalController.dismiss();
  }

  updateSearch() {
    this.show = true;
  }

  ngOnInit() {
  }

}
