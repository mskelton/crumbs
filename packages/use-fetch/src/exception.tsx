export enum ErrorCode {
  Unauthorized,
  Unhandled,
}

export class Exception extends Error {
  constructor(public code: ErrorCode, public message: string) {
    super(message)
  }
}
