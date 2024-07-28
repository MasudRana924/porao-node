// src/types/CustomError.ts
export interface CustomError extends Error {
  response?: {
    data?: {
      data?: any;
      error?: any;
      errors?: any;
    };
    error?: any;
    status?: number;
    statusText?: string;
    request?: {
      path?: string;
    };
    title?: string;
    message?: string;
  };
  data?: {
    errors?: any;
    [key: string]: any;
  };
  errors?: any;
  status?: number;
  title?: string;
  request?: {
    path?: string;
  };
  statusText?: string;
  source?: string;
}
