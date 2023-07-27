import { mockVscodeApi, vscode } from './acquireVsCodeApi'
import { MessageIncomeType, MessageResponseType, MessageTypeMap } from './type'

export const callService = <
  T extends MessageTypeMap,
  U extends keyof T = keyof T
>(
  service: U,
  params: T[U]['params']
) =>
  new Promise<T[U]['response']>(async resolve => {
    const eventId = setTimeout(() => {})
    const messageIncome: MessageIncomeType<any> = {
      service,
      params,
      eventId,
    }

    const next = vscode.postMessage(messageIncome)

    // hook message
    if (mockVscodeApi.hook) {
      mockVscodeApi.hook(messageIncome)
    }

    // for mock
    if (vscode.__mock) {
      const promiseRequest = next as any as Promise<any>
      promiseRequest.then(resolve)
      return
    }

    const handle = (event: MessageEvent) => {
      if (event.data) {
        const {
          service: serviceUri,
          response,
          eventId: resId,
        } = event.data as MessageResponseType
        if (serviceUri === service && eventId === resId) {
          console.log(`[Client] ${String(service)}:`, response)
          resolve(response)
          window.removeEventListener('message', handle)
        }
      }
    }
    window.addEventListener('message', handle)
  })
