export interface ApiError {
  detail: string;
}

export interface ApiAuthError {
  [key: string]: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
