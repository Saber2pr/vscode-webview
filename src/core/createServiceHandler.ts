import type { WebviewPanel } from 'vscode'

import {
  HandleMap,
  MessageIncomeType,
  MessageResponseType,
  MessageTypeMap,
} from './type'

export const createServiceHandler =
  <T extends MessageTypeMap>(handleMap: HandleMap<T>) =>
    async (
      webviewPanel: WebviewPanel,
      IncomingMessage: MessageIncomeType<any>
    ) => {
      const { service, params, eventId } = IncomingMessage
      const response = await handleMap[service](params)
      const responseMsg: MessageResponseType = {
        service,
        response,
        eventId
      }
      console.log(`[Service] ${service}:`, response)
      webviewPanel.webview.postMessage(responseMsg)
    }
