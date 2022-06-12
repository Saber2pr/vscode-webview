import { MessageIncomeType } from './type'

declare const acquireVsCodeApi: () => {
  postMessage(value: MessageIncomeType): void
  [k: string]: any
}

const isInVscode = typeof acquireVsCodeApi === 'function'

export const mockVscodeApi = {
  __mock: true,
  postMessage: (value: any) => console.log('Mock Api Not Implementation'),
  hook: (value: any) => {},
}

export type MockVscodeApi = {
  postMessage(value: MessageIncomeType): any
  hook?(value: MessageIncomeType): any
}

export const setMockVscodeApi = (api: MockVscodeApi) => {
  mockVscodeApi.postMessage = api.postMessage
  mockVscodeApi.hook = api.hook
}

export const vscode = isInVscode ? acquireVsCodeApi() : mockVscodeApi
