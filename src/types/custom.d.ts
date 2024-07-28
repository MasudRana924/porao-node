import 'express';

declare module 'express' {
  interface Response {
    badRequest: (data: any, message: string, error: any) => void;
    unauthorized: (data: any, message: string, error: any) => void;
    forbidden: (data: any, message: string, error: any) => void;
    notFound: (data: any, message: string, error: any) => void;
    conflict: (data: any, message: string, error: any) => void;
    serviceUnavailable: (status: number, title: string, error: any) => void;
    internalServerError: (status: number, data: any, error: any) => void;
  }
}
