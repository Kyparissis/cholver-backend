const { FormData, File } = require('formdata-node');
const { FormDataEncoder } = require('form-data-encoder');
const { Readable } = require('stream');

function getFormDataDetails({ formDataFieldName, fileContent, fileName }) {
  const formData = new FormData();
  const file = new File([fileContent], fileName);
  formData.set(formDataFieldName, file);

  const encoder = new FormDataEncoder(formData);

  return {
    requestBody: Readable.from(encoder.encode()),
    requestHeaders: encoder.headers,
  };
}
exports.getFormDataDetails = getFormDataDetails;
