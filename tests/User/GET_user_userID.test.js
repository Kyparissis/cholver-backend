const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");
const {
  userUserIDGET,
} = require("../../service/UserService.js");

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


// Tests for Endpoint: GET/user/{userID}

// Server Tests

test("GET user by userID | calling the function should work successfully", async (t) => {
  const userId = 0;
  const result = await userUserIDGET(userId);
  const randUser = result;
  t.is(randUser.userDescription, "userDescription");
  t.is(randUser.gender, "gender");
  t.is(randUser.city, "city");
  t.is(randUser.phone, "phone");
  t.is(randUser.profilePic, "");
  t.is(randUser.rating, 1);
  t.is(randUser.fullname, "fullname");
  t.is(randUser.userID, 0);
  t.is(randUser.email, "email");
  t.is(randUser.age, 6);
});

test("GET user by userID | endpoint should work successfully", async (t) => {
  const userId = 0;
  const { body, statusCode } = await t.context.got.get(`user/${userId}`);
  t.is(statusCode, 200);
  const randUser = body;
  t.is(randUser.userDescription, "userDescription");
  t.is(randUser.gender, "gender");
  t.is(randUser.city, "city");
  t.is(randUser.phone, "phone");
  t.is(randUser.profilePic, "");
  t.is(randUser.rating, 1);
  t.is(randUser.fullname, "fullname");
  t.is(randUser.userID, 0);
  t.is(randUser.email, "email");
  t.is(randUser.age, 6);
});
