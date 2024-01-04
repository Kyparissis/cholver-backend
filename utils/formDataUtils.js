// Import the required modules
const { FormData, File } = require('formdata-node'); 
const { FormDataEncoder } = require('form-data-encoder');
const { Readable } = require('stream');

/**
 * This function returns the request body and headers for a form data request
 * @param {*} Object containing the form data field name, file content and file name 
 * @returns The request body and headers for a form data request
 */
function getFormDataDetails({ formDataFieldName, fileContent, fileName }) {
  const formData = new FormData();
  const file = new File([fileContent], fileName);
  // Add the file to the form data
  formData.set(formDataFieldName, file);

  // Encode the form data
  const encoder = new FormDataEncoder(formData);

  // Return the request body and headers
  // in the format required by the request
  return {
    requestBody: Readable.from(encoder.encode()),   // Convert the encoded form data to a readable stream
    requestHeaders: encoder.headers,
  };
}

// Export the function to be used in other files
exports.getFormDataDetails = getFormDataDetails;
