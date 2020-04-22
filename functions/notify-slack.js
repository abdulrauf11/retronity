let request = require("request")

// populate environment variables locally.
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// Handle the lambda invocation
exports.handler = function(event, context, callback) {
  // get the arguments from the notification
  let body = JSON.parse(event.body)

  // prepare call to the Slack API
  let slackURL = process.env.SLACK_DOWNLOAD_WEBHOOK_URL
  let slackPayload = {
    text: `"${body.name}" was just downloaded.`,
  }

  request.post({ url: slackURL, json: slackPayload }, function(
    err,
    httpResponse,
    body
  ) {
    let msg
    if (err) {
      msg = "Post to Slack failed:" + err
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({ mesage: msg }),
      })
    } else {
      msg = "Post to Slack successful!  Server responded with:" + body
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ mesage: msg }),
      })
    }
  })
}
