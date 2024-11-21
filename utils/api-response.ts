export class ApiResponse<T> {
  constructor(
    public data: T,
    public statusCode: number,
    public message?: string
  ) {}
}

export class ApiErrorResponse extends ApiResponse<null> {
  constructor(
    message: string,
    statusCode: number,
    public errors?: ApiError[]
  ) {
    super(null, statusCode, message);
  }
}

export class ApiError {
  constructor(
    public message: string,
    public meta: Record<string, any>[],
    public code?: string
  ) {}
}
