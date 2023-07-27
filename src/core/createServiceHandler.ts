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
    const responseMsg: MessageResponseType = {
      service,
      response: null,
      eventId,
      success: true,
    }
    if (typeof handleMap[service] === 'function') {
      responseMsg.response = await handleMap[service](params)
      responseMsg.success = true
      console.log(`[Service] ${service}:`, responseMsg.response)
      webviewPanel.webview.postMessage(responseMsg)
    } else {
      console.log(`[Service ERROR] ${service} is not implement !!`)
      responseMsg.success = false
      webviewPanel.webview.postMessage(responseMsg)
    }
  }
