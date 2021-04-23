import Pusher from "pusher";
import { getPusherCredentials } from './config';

let pusher;

export function sendEvent(channel, event, data) {
  if (!pusher) {
    pusher = new Pusher(getPusherCredentials())
  }

  pusher.trigger(channel, event, data)
}
