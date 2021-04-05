import Pusher from "pusher";
import { getPusherCredentials } from './config';

let pusher;

export function sendEvent(channel, event, data) {
  console.log(getPusherCredentials());
  if (!pusher) {
    pusher = new Pusher(getPusherCredentials())
  }

  pusher.trigger(channel, event, data)
}
