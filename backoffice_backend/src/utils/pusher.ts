import Pusher from "pusher";
import { getPusherCredentials } from './config';

let pusher;

/**
 * Sending an event to pusher.
 *
 * @param channel The channel name.
 * @param event The event name.
 * @param data The data to send, AKA payload.
 */
export function sendEvent(channel, event, data) {
  if (!pusher) {
    pusher = new Pusher(getPusherCredentials())
  }

  pusher.trigger(channel, event, data)
}

/**
 * Remove any sensitive data before sending it to pusher.
 *
 * @param document The data to send, AKA payload.
 * @param model The model name.
 */
export function prepareDocumentToPusherEvent(document, model) {
  const clonedDocument = document.toJSON();
  delete clonedDocument['password'];
  delete clonedDocument['token'];
  clonedDocument['model'] = model;
  return clonedDocument;
}
