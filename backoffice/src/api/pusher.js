import Pusher from 'pusher-js';
import {PUSHER_APP_CLUSTER, PUSHER_APP_DEBUG, PUSHER_APP_ID} from "./core";

let pusher = null;

export function getPusherChannel(channelName = 'main') {
  Pusher.logToConsole = PUSHER_APP_DEBUG === 'true';

  if (!pusher) {
    pusher = new Pusher(PUSHER_APP_ID, {
      cluster: PUSHER_APP_CLUSTER,
    });
  }

  return pusher.subscribe(channelName);
}
