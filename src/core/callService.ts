import { MessageIncomeType, MessageResponseType, MessageTypeMap } from './type'

declare const acquireVsCodeApi: () => {
  postMessage(value: MessageIncomeType): void
  [k: string]: any
}

const isInVscode = typeof acquireVsCodeApi === 'function'

export const vscode = isInVscode ? acquireVsCodeApi() : null

export const callService = <
  T extends MessageTypeMap,
  U extends keyof T = keyof T
>(
  service: U,
  params: T[U]['params']
) =>
  new Promise<T[U]['response']>(async resolve => {
    const eventId = setTimeout(() => { })
    const messageIncome: MessageIncomeType<any> = {
      service,
      params,
      eventId
    }
    
    const next = vscode.postMessage(messageIncome)
    if(vscode.__mock) {
      const promiseRequest = next as any as Promise<any>
      promiseRequest.then(resolve)
      return
    }

    const handle = (event: MessageEvent) => {
      if (event.data) {
        const { service: serviceUri, response, eventId: resId } = event.data as MessageResponseType
        if (serviceUri === service && eventId === resId) {
          console.log(`[Client] ${service}:`, response)
          resolve(response)
          window.removeEventListener('message', handle)
        }
      }
    }
    window.addEventListener('message', handle)
  })
