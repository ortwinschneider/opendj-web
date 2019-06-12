import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class WebsocketService {

    // Our socket connection
    private socket;

    constructor() {
        this.socket = io(environment.ws_url, {
            reconnectionAttempts: 10
        });
    }

    getPlaylist() {
        const observable = new Observable(observer => {
            this.socket.on('playlist', (data) => {
                console.log('Received playlist update Websocket Server');
                observer.next(data);
            });
        });
        return observable;
    }

    updatePlaylist(playlist) {
        this.socket.emit('playlist', playlist);
    }

}
