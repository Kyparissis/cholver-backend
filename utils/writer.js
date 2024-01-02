var ResponsePayload = function (code, payload) {
  this.code = code;
  this.payload = payload;
};

exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
};

function writeJson (response, arg1, arg2) {
  var { code, payload } = processArguments(arg1, arg2);
  var formattedPayload = formatPayload(payload);

  sendResponse(response, code, formattedPayload);
};

exports.writeJson = writeJson

function processArguments(arg1, arg2) {
  if (arg1 instanceof ResponsePayload) {
    return { code: arg1.code, payload: arg1.payload };
  }

  var code = Number.isInteger(arg2) ? arg2 : Number.isInteger(arg1) ? arg1 : 200;
  var payload = arg1;

  return { code, payload };
}

function formatPayload(payload) {
  return typeof payload === "object" ? JSON.stringify(payload, null, 2) : payload;
}

function sendResponse(response, code, payload) {
  if (!code) {
    code = 200;
  }
  response.writeHead(code, { "Content-Type": "application/json" });
  response.end(payload);
}
