import { Request, Response, NextFunction } from 'express';
import { stringifySafe } from './stringifySafe';
import { errorCodes } from './errorCodes';
import { CustomError } from '../types/CustomError';

function getErrData(err: CustomError): any {
  if (err) {
    if (err.response && err.response.data) {
      return err.response.data.data || err.response.data;
    } else if (err.data) {
      return err.data.errors || err.data;
    } else if (err.errors) {
      return err.errors;
    }
  }
  return {};
}

function getErrError(err: CustomError): any {
  if (err) {
    let errorData: any = {};
    if (err.errors) {
      errorData = err.errors;
    } else if (err.response && err.response.error) {
      errorData = err.response.error;
    }
    const { customMessage, ...errorObj } = errorData;
    errorData = { ...errorObj };
    if (errorCodes[errorData.code]) {
      errorData = { ...errorData, ...errorCodes[errorData.code] };
    }

    if (!Object.keys(errorData).length && err.response && err.response.data) {
      errorData = { ...err.response.data.error };
    }
    if (customMessage) {
      errorData['message'] = customMessage;
    }
    return errorData;
  }
  return {};
}

const errorResponseHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = err.response || {};

  // Destructure response with default values
  const {
    title = null,
    errors = null,
    request = {},
    statusText = null,
    message = '',
    status = err.status,
  } = response as {
    title?: string | null;
    errors?: any;
    request?: {
      path?: string;
    };
    statusText?: string | null;
    message?: string;
    status?: number;
  };

  const instance = request?.path || req.originalUrl;
  let errorTitle: string;

  const data = getErrData(err);
  const error = getErrError(err);

  switch (status) {
    case 400:
      res.badRequest(
        { title: message, instance, ...data },
        message || error.message,
        error
      );
      break;
    case 401:
      res.unauthorized(
        {
          title: title || statusText || 'Authentication Failed',
          instance,
          ...data,
        },
        message || error.message,
        error
      );
      break;
    case 403:
      res.forbidden(
        {
          title: message || title,
          instance,
        },
        error.message || 'Forbidden',
        error
      );
      break;
    case 404:
      res.notFound(
        {
          title: title || statusText,
          instance,
          ...data,
        },
        error.message || 'Resource not found',
        error
      );
      break;
    case 409:
      res.conflict(
        {
          title: title || statusText,
          instance,
          ...data,
        },
        message || error.message,
        error
      );
      break;
    case 422:
      res.badRequest(
        { title: message || 'Something went wrong.', instance, ...data },
        message || error.message || 'Something went wrong.',
        error
      );
      break;
    case 503:
      errorTitle =
        title ||
        statusText ||
        (err.source
          ? `${err.source} unavailable`
          : 'Service unavailable');
      console.error(stringifySafe(err, null, 2));
      res.serviceUnavailable(503, errorTitle, error);
      break;
    default:
      errorTitle =
        title ||
        statusText ||
        (err.source
          ? `${err.source} Internal Error`
          : 'Internal Error');
      console.error(stringifySafe(err, null, 2));
      res.internalServerError(
        status || 500,
        {
          title: errorTitle,
          instance,
        },
        error
      );
  }
};

export { errorResponseHandler };
