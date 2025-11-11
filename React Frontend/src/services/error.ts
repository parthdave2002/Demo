interface ErrorDebugResult {
  statusCode: number;
  responseBody: any;
  stackTrace: string;
}

export function errorDebug(error: any, identityCode: string): ErrorDebugResult {
  let err = new Error();
  const message = `
          Identity Code  📢 :: ${identityCode}
          StackTrace 🚀 :: ${err.stack}
      `;
  const errorResult: ErrorDebugResult = {
    statusCode: error.statusCode,
    responseBody: error.message,
    stackTrace: message,
  };

  return errorResult;
}
