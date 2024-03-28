// facet/errors.ts
import Prisma, {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import { logError, logInfo } from '../logger';

function handleKnownRequestError(error: PrismaClientKnownRequestError, modelName: string): boolean {
  switch (error.code) {
    // If you have specific error codes to handle, you can add cases here.
    // case 'P2002':
    //   logError('There is a unique constraint violation', modelName);
    //   return true;
    default:
      logError(error.message, modelName);
      return false;
  }
}

function handleUnknownRequestError(error: PrismaClientUnknownRequestError): boolean {
  logError('An unknown error occurred.', 'Unknown Model');
  logInfo(error.message);
  return true;
}

export function handlePrismaError(
  error: Prisma.PrismaClientKnownRequestError | PrismaClientUnknownRequestError,
  modelName: string
): boolean {
  if (error instanceof PrismaClientKnownRequestError) {
    return handleKnownRequestError(error, modelName);
  } else if (error instanceof PrismaClientUnknownRequestError) {
    return handleUnknownRequestError(error);
  } else {
    return false;
  }
}
