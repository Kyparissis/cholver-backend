const http = require("http");
const test = require("ava");
const listen = require("test-listen");
const got = require("got");
const app = require("../../index.js");
const {
  userGET,
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


//_________GET/user_________________________
//Test function
test("GET users by keyword | calling the function should work successfully", async (t) => {
  const keyword = "keyword";
  const result = await userGET(keyword);
  const randUser = result[1];

  // t.true(result.every(user => user.fullname.includes(keyword) || user.userDescription.includes(keyword)));

  // console.log(typeof randUser.userID);

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

//Test Server
test("GET users by keyword | endpoint should work successfully", async (t) => {
  const keyword = "keyword";
  const { body, statusCode } = await t.context.got.get(
    `user?keyword=${keyword}`,
  );

  t.is(statusCode, 200);

  const randUser = body[0];

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

// Testing unhappy paths
// 1. Wrong data type of keyword (400)
test("GET users by keyword | endpoint should error if keyword is null", async (t) => {
  const keyword = null; // keyword is integer instead of string
  const error = await t.throwsAsync(async () => {
    await t.context.got.get("user", {
      searchParams: {
        keyword: keyword,
      },
    }),
      { instanceof: got.HTTPError };
  });

  t.is(error.response.statusCode, 400);
  t.is(
    error.response.body.message,
    "Empty value found for query parameter 'keyword'",
  );
});