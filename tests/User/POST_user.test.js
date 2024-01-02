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


// Tests for Endpoint: POST/user

// Server Tests

test("POST user | calling the function should work successfully", async (t) => {
  const body = {
    fullname: "Fullname",
    email: "email@gmail.com",
    age: 22,
    city: "City",
    phone: "Phone",
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };
  await userPOST(body);
  t.pass();
});

test("POST user | endpoint should work successfully", async (t) => {
  const { statusCode } = await t.context.got.post(`user`, {
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      fullname: "Fullname",
      email: "email@gmail.com",
      age: 22,
      city: "City",
      phone: "Phone",
      userDescription: "Description",
      gender: "Gender",
      profilePic: "ProfilePic",
    }),
  });
  t.is(statusCode, 200);
});

// Undefined Request Body (400)

test("POST user | endpoint should error if fullname is not a string", async (t) => {
  const body = {
    fullname: 3243234323432,
    email: "email@gmail.com",
    age: 22,
    city: "City",
    phone: "Phone",
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, "request.body.fullname should be string");
});

test("POST user | endpoint should error if email is not a string", async (t) => {
  const body = {
    fullname: "Fullname",
    email: 987567,
    age: 22,
    city: "City",
    phone: "Phone",
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, "request.body.email should be string");
});

test("POST user | endpoint should error if age is not an integer", async (t) => {
  const body = {
    fullname: "Fullname",
    email: "email@gmail.com",
    age: "Twenty Two",
    city: "City",
    phone: "Phone",
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, "request.body.age should be integer");
});

test("POST user | endpoint should error if phone is not a string", async (t) => {
  const body = {
    fullname: "Fullname",
    email: "email@gmail.com",
    age: 22,
    city: "City",
    phone: 6954789046,
    userDescription: "Description",
    gender: "Gender",
    profilePic: "ProfilePic",
  };
  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user`, { json: body });
  });
  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, "request.body.phone should be string");
});

test("POST user | endpoint should error if gender is null", async (t) => {
  const requestBody = {
    fullname: "string",
    email: "string",
    age: 0,
    city: "string",
    phone: "string",
    userDescription: "string",
    gender: null,
    profilePic: "string",
  };

  const error = await t.throwsAsync(async () => {
    await t.context.got.post(`user/`, { json: requestBody }),
      { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, "request.body.gender should be string");
});