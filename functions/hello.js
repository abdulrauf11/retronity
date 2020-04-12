let request = require("request")

// populate environment variables locally.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.handler = async event => {
  const subject = event.queryStringParameters.name || "World"
  return {
    statusCode: 200,
    body: `Hello ${subject}!`,
  }
}
