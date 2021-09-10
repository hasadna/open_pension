const elasticsearch = require('elasticsearch');
let client;

type DebugLevel = "debug" | "info" | "warn" | "error" | "fatal";

function getESClient() {
  if (client) {
    return client;
  }

  client = new elasticsearch.Client({
    host: process.env.ELASTIC_SEARCH_ADDRESS,
    apiVersion: process.env.ELASTIC_API_VERSION,
  });

  return client;
}

/**
 * Creating the index. Should be called when the server starts.
 */
export async function createIndex() {
  try {
    await getESClient().indices.create({
      index: 'logs',
      body: {
        mappings: {
          properties: {
            text: { type: 'text' },
            service: { type: 'text' },
            time: { type: 'date' },
            level: {type: 'text'}
          }
        }
      }
    }, { ignore: [400] })
  } catch (e) {
    console.log(e);
  }
}

/**
 * Inserting a document to the ES logs index.
 */
export function log(text: string, level: DebugLevel = 'info') {
  const doc = {
    text,
    level,
    service: process.env.ELASTIC_SERVICE_NAME,
    time: new Date(),
  };

  return getESClient().bulk({
    refresh: true,
    body: [
      { index: { _index: 'logs' } },
      doc
    ]
  }).finally(() => {
    console.log(text)
  });
}
