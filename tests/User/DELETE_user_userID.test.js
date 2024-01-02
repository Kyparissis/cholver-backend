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

test("Delete User | calling the function should work successfully", async (t) => {
  const userId = 1;
  const user = await userUserIDDELETE(userId);
  t.is(user.userDescription, "userDescription");
  t.is(user.gender, "gender");
  t.is(user.city, "city");
  t.is(user.phone, "phone");
  t.is(user.profilePic, "");
  t.is(user.rating, 1);
  t.is(user.fullname, "fullname");
  t.is(user.userID, 0);
  t.is(user.email, "email");
  t.is(user.age, 6);
});

test("Delete User | endpoint should work successfully", async (t) => {
  const userId = 1;
  const { body, statusCode } = await t.context.got.delete(`user/${userId}`);
  t.is(statusCode, 200);

  t.is(body.userDescription, "userDescription");
  t.is(body.gender, "gender");
  t.is(body.city, "city");
  t.is(body.phone, "phone");
  t.is(body.profilePic, "");
  t.is(body.rating, 1);
  t.is(body.fullname, "fullname");
  t.is(body.userID, 0);
  t.is(body.email, "email");
  t.is(body.age, 6);
});