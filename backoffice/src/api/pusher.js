import Pusher from 'pusher-js';
import {PUSHER_APP_ID} from "./core";

let pusher = null;

export function getPusher(channelName = 'main') {
  Pusher.logToConsole = true;

  if (!pusher) {
    pusher = new Pusher(PUSHER_APP_ID, {
      cluster: 'ap2',
    });
  }

  return pusher.subscribe(channelName);
}
