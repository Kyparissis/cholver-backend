/**
 * This function returns the response payload and status code
 * (It is dummy function so that the code can be compiled)
 * @param {*} code: The response status code
 * @param {*} payload: The response payload 
 */
var ResponsePayload = function (code, payload) {
  this.code = code;
  this.payload = payload;
};

/**
 * This function returns the response payload and status code
 * Then it is exported to be used in other files
 * @param {*} code: The response status code 
 * @param {*} payload: The response payload 
 * @returns: The response payload and status code 
 */
exports.respondWithCode = function (code, payload) {
  return new ResponsePayload(code, payload);
};

/**
 * This function writes the response payload and status code
 * in the format required by the request and then sends the response
 * @param {*} response: The response object containing the response payload and status code 
 * @param {*} arg1: An argument to be processed into the response payload and status code
 * @param {*} arg2: Another argument to be processed into the response payload and status code 
 */
function writeJson (response, arg1, arg2) {
  // Process the arguments into the response payload and status code
  var { code, payload } = processArguments(arg1, arg2);
  // Format the payload
  var formattedPayload = formatPayload(payload);

  // Send the response 
  sendResponse(response, code, formattedPayload);
}

// Export the function to be used in other files
exports.writeJson = writeJson

/**
 * This function processes the arguments into the response payload and status code
 * @param {*} arg1: An argument to be processed into the response payload and status code 
 * @param {*} arg2: Another argument to be processed into the response payload and status code 
 * @returns: The response payload and status code 
 */
function processArguments(arg1, arg2) {
  // Check if the first argument is an instance of ResponsePayload
  if (arg1 instanceof ResponsePayload) {
    // If it is, return the code and payload from the object
    return { code: arg1.code, payload: arg1.payload };
  }

  // Else, check if the first argument is a number
  // If it is, return the number 200 as the code and the second argument as the payload
  // Else, check if the second argument is a number return that as the code
  var code = Number.isInteger(arg2) ? arg2 : Number.isInteger(arg1) ? arg1 : 200;
  var payload = arg1;

  // Format the code and payload into an object
  return { code, payload };
}

/**
 * This function formats the payload into a string if it is an object
 * @param {*} payload: The response payload to be formatted 
 * @returns: The formatted payload 
 */
function formatPayload(payload) {
  // Check if the payload is an object. If it is, return the stringified payload, else return the payload itself
  return typeof payload === "object" ? JSON.stringify(payload, null, 2) : payload;
}

/**
 * This function sends the response in the format required by the request
 * @param {*} response: The response object containing the response payload and status code 
 * @param {*} code: The response status code 
 * @param {*} payload: The response payload 
 */
function sendResponse(response, code, payload) {
  // Check if the code is undefined. If it is, set it to 200
  if (!code) {
    code = 200;
  }

  // Set the response status code and content type
  response.writeHead(code, { "Content-Type": "application/json" });

  // Send the response payload
  response.end(payload);
}
