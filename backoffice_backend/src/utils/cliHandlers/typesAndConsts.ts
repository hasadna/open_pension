export const ArgsRegex = /--(.*)=(.*)/gm;

export type HandlerOptions = {
  [key: string]: any
}

export type ActionNameAndOptions = {
  action: string,
  options: HandlerOptions
};
