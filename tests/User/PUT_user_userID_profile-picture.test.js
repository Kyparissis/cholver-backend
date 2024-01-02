const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");
const {
  userUserIDDELETE,
  userUserIDProfile_picturePUT,
  userPOST,
  userUserIDGET,
  userGET,
  userUserIDPUT,
} = require("../../service/UserService.js");
const { FormData, File } = require("formdata-node");
const { FormDataEncoder } = require("form-data-encoder");
const { Readable } = require("stream");

test.before(async (t) => {
  t.context.server = http.createServer(app);
  t.context.prefixUrl = await listen(t.context.server);
  t.context.got = got.extend({
    prefixUrl: t.context.prefixUrl,
    responseType: "json",
  });
});

test.after.always((t) => {
  t.context.server.close();
});


test("Upload Profile Picture | calling the function should work successfully", async (t) => {
  const userId = 1;
  const response = await userUserIDProfile_picturePUT(userId);
  t.is(response.message, "Picture uploaded successfully");
});

test("Upload Profile Picture | endpoint should work successfully", async (t) => {
  const userId = 1;

  const formData = new FormData();
  const file = new File(["example content"], "profilePicture.png");
  formData.set("file", file);

  const encoder = new FormDataEncoder(formData);

  const { body, statusCode } = await t.context.got.put(
    `user/${userId}/profile-picture`,
    {
      body: Readable.from(encoder.encode()),
      headers: encoder.headers,
    },
  );
  t.is(statusCode, 200);
  t.is(body.message, "Picture uploaded successfully");
});

test("Upload Profile Picture | endpoint should error if no file is passed", async (t) => {
  const userId = 1;

  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userId}/profile-picture`);
  });
  t.is(error.response.statusCode, 415);
  t.is(error.response.body.message, "unsupported media type undefined");
});