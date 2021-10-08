export const ArgsRegex = /--(.*)=(.*)/gm;

export type HandlerOptions = {
  [key: string]: any
}

export type ActionNameAndOptions = {
  action: string,
  options: HandlerOptions
};

export type HandlerPayload = {questions: object[], postInterrogationHandler: any};

export type Handler = {
  [name: string]: {
    handler: () => HandlerPayload,
    allowedValues: string[],
  }
}
