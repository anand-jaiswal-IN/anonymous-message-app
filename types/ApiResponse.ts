interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

function ApiResponse(
  success: boolean,
  message: string,
  data?: any,
  error?: any
): ApiResponse {
  return {
    success,
    message,
    data,
    error,
  };
}

export function SuccessResponse(message: string, data?: any): ApiResponse {
  return ApiResponse(true, message, data, undefined);
}

export function ErrorResponse(message: string, error?: any): ApiResponse {
  return ApiResponse(false, message, undefined, error);
}

export default ApiResponse;
