import type { RequestOptions } from '../../request'
import { requestStream } from '../../request'

export interface AccountConnectionTestRequest {
  accountId: string
  modelId: string
  prompt: string
  reasoningEffort?: string
}

export function testAccountConnection(data: AccountConnectionTestRequest, options: RequestOptions = {}) {
  return requestStream({
    url: '/api/admin/accounts/connection-test',
    method: 'POST',
    data,
    timeout: 0,
    ...options,
  }, {
    maximumBytes: 1024 * 1024,
    accept: response => response.status === 200
      && !!response.header('content-type')?.startsWith('text/event-stream'),
  })
}
