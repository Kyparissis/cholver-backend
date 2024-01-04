"use strict";

var path = require("path");   // Required to resolve file paths
var http = require("http");   // Required to create a server

var oas3Tools = require("oas3-tools");  // Required to use Swagger Tools middleware

// Set the server port to env.PORT if provided, otherwise 8080
// env.PORT is needed when deploying to Railway
// 8080 is needed when running locally
var serverPort = process.env.PORT || 8080;

// swaggerRouter configuration
// The options argument defines the routing options to be used by the middleware
var options = {
  routing: {
    // Set the path for the controllers directory
    controllers: path.join(__dirname, "./controllers"),
  },
};

// Generate the express app 
var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, "api/openapi.yaml"), options);

// Generate the express app's middleware from the OpenAPI specification
var app = expressAppConfig.getApp();

// Initialize the Swagger Middleware
// Check if we are on the test environment (if so, don't listen for connections)
if (process.env.NODE_ENV !== "test") {
  // Start the server on the provided port
  http.createServer(app).listen(serverPort, function () {
    // Provide confirmation that the server is running and on what port
    // URL for the server
    console.log("Your server is listening on port %d (http://localhost:%d)", serverPort, serverPort);
    // URL for swagger docs
    console.log("Swagger-ui is available on http://localhost:%d/docs", serverPort);
  });
}

// Export the application for testing purposes
module.exports = app;