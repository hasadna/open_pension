import Pusher from "pusher";
import { getPusherCredentials } from './config';

let pusher;

export function sendEvent(channel, event, data) {
  if (!pusher) {
    pusher = new Pusher(getPusherCredentials())
  }

  pusher.trigger(channel, event, data)
}

export function prepareDocumentToPusherEvent(document, model) {
  const {_doc: clonedDocument} = Object.assign(document);
  delete clonedDocument['password'];
  delete clonedDocument['token'];
  clonedDocument['model'] = model;
  return clonedDocument;
}
