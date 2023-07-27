export type Pair<P = any, R = any> = {
  params: P
  response: R
}

export type MessageTypeMap = {
  [k: string]: Pair<any, any>
}

export type MessageIncomeType<
  T extends keyof MessageTypeMap = keyof MessageTypeMap
> = {
  eventId: number
  service: T
  params: MessageTypeMap[T]['params']
}

export type MessageResponseType<
  T extends keyof MessageTypeMap = keyof MessageTypeMap
> = {
  eventId: number
  service: T
  response: MessageTypeMap[T]['response']
  success: boolean
}

export type HandleMap<T extends MessageTypeMap, U extends keyof T = keyof T> = {
  [key in U]: (
    data: T[key]['params']
  ) => Promise<T[key]['response']> | T[key]['response']
}
