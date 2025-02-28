
# Heroku Deployment Instructions

Follow these steps to deploy this application to Heroku:

## Prerequisites

1. Create a Heroku account at [heroku.com](https://heroku.com) if you don't have one
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Login to Heroku CLI by running:
   ```
   heroku login
   ```

## Deployment Steps

1. First, run the build helper script to ensure the package.json is correctly configured:
   ```
   node heroku-build.js
   ```

2. Build the application locally:
   ```
   npm run build
   ```

3. Create a new Heroku app (or use an existing one):
   ```
   heroku create big-bun-notify
   ```
   
4. Add the Heroku buildpack for Node.js:
   ```
   heroku buildpacks:set heroku/nodejs
   ```
   
5. Add the Heroku buildpack for static sites:
   ```
   heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git
   ```
   
6. Make sure your Procfile has the correct command:
   The Procfile should contain: `web: npm run start`
   
7. Commit any changes to Git:
   ```
   git add .
   git commit -m "Configure for Heroku deployment"
   ```
   
8. Deploy your code:
   ```
   git push heroku main
   ```
   
9. Open your deployed app:
   ```
   heroku open
   ```

10. If you encounter any issues, check the logs:
    ```
    heroku logs --tail
    ```

## Environment Variables (for production)

For production use, you'll want to set actual API keys for Twilio and SendGrid. You can set these environment variables with the following commands:

```
heroku config:set TWILIO_ACCOUNT_SID=your_account_sid
heroku config:set TWILIO_AUTH_TOKEN=your_auth_token
heroku config:set TWILIO_PHONE_NUMBER=your_twilio_phone
heroku config:set SENDGRID_API_KEY=your_sendgrid_key
heroku config:set FROM_EMAIL=your_from_email
```

## Troubleshooting

If you encounter issues with the application routing, make sure:
- Your static.json file is correctly set up
- You have added both buildpacks mentioned above
- The "start" script in package.json is set to "node server.js"
- Your server.js file is correctly configured to serve static files from the dist directory

For more help, check Heroku's documentation or run:
```
heroku logs --tail
```
