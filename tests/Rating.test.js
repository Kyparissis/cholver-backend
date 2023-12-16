const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../index.js");
const { userUserIDRatePUT } = require("../service/RatingService.js");

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

test("Rate User function works successfully", async (t) => {
  const body = { raterUserID: 3, rating: 2 };
  const userId = 1;
  await userUserIDRatePUT(body, userId);
  t.pass();
});

test("Rate User responds with status code 200", async (t) => {
  const userId = 1;
  const { statusCode } = await t.context.got.put(`user/${userId}/rate`, {
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ raterUserID: 3, rating: 2 }),
  });
  t.is(statusCode, 200);
});

test("Rate User responds with status code 415 if content type is not json", async (t) => {
  const userId = 1;
  const error = await t.throwsAsync(async () => {
    await t.context.got.put(`user/${userId}/rate`, {
      body: JSON.stringify({ raterUserID: 3, rating: 2 }),
    });
  });
  t.is(error.response.statusCode, 415);
  t.is(error.response.body.message, "unsupported media type undefined");
});
