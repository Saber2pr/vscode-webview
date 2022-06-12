import { MessageIncomeType } from './type'

declare const acquireVsCodeApi: () => {
  postMessage(value: MessageIncomeType): void
  [k: string]: any
}

const isInVscode = typeof acquireVsCodeApi === 'function'

const mockVscodeApi = {
  __mock: true,
  postMessage: (value: any) => console.log('Mock Api Not Implementation'),
}

export const setMockVscodeApi = (api: ReturnType<typeof acquireVsCodeApi>) => {
  mockVscodeApi.postMessage = api.postMessage
}

export const vscode = isInVscode ? acquireVsCodeApi() : mockVscodeApi
