# @saber2pr/vscode-webview

vscode webview utils.

```bash
yarn add @saber2pr/vscode-webview
```

### Feature

```ts
import {
  callService,
  createServiceHandler,
  Pair,
} from '@saber2pr/vscode-webview'

// service type define
export type Services = {
  sayHello: Pair<any, any>
}

const handleServiceMessage = createServiceHandler<Services>({
  sayHello: () => vscode.window.showInformationMessage('Hello! Webview!'),
})

// extension.ts
webviewPanel.webview.onDidReceiveMessage(
  message => handleServiceMessage(webviewPanel, message),
  null,
  context.subscriptions
)

// web
callService<Services, 'sayHello'>('sayHello', null).then(res => {})
```
