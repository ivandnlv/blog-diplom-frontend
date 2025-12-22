import type { BaseResponse } from '~/types/api'

export function isBaseResponse(object: unknown): object is BaseResponse {
  if (!object || typeof object !== 'object') return false

  return 'message' in object && 'error' in object && 'statusCode' in object
}
