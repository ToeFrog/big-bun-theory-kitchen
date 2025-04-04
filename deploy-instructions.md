
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

1. **CRITICAL STEP**: First, run the build helper script to ensure the package.json is correctly configured with the start script:
   ```
   node heroku-build.js
   ```

2. Verify that the start script has been added to package.json:
   ```
   cat package.json | grep start
   ```
   You should see an output like: `"start": "node server.cjs",`
   
   If you don't see this output, the build script didn't run successfully. Try running it again.

3. Build the application locally:
   ```
   npm run build
   ```

4. Create a new Heroku app (or use an existing one):
   ```
   heroku create big-bun-notify
   ```
   
5. Add the Heroku buildpack for Node.js:
   ```
   heroku buildpacks:set heroku/nodejs
   ```
   
6. Add the Heroku buildpack for static sites:
   ```
   heroku buildpacks:add https://github.com/heroku/heroku-buildpack-static.git
   ```
   
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

For production use, you must set the following environment variables for Twilio and SendGrid:

```
heroku config:set VITE_TWILIO_ACCOUNT_SID=your_account_sid
heroku config:set VITE_TWILIO_AUTH_TOKEN=your_auth_token
heroku config:set VITE_TWILIO_PHONE_NUMBER=your_twilio_phone
heroku config:set VITE_SENDGRID_API_KEY=your_sendgrid_key
heroku config:set VITE_FROM_EMAIL=your_from_email
```

Without these, the messaging functionality will not work properly in production.

## Locally Testing SMS and Email

To test locally, you can create a `.env` file in the root directory with the following variables:

```
VITE_TWILIO_ACCOUNT_SID=your_account_sid
VITE_TWILIO_AUTH_TOKEN=your_auth_token
VITE_TWILIO_PHONE_NUMBER=your_twilio_phone
VITE_SENDGRID_API_KEY=your_sendgrid_key
VITE_FROM_EMAIL=your_from_email
```

## Troubleshooting

If you encounter issues with the application routing, make sure:
- Your static.json file is correctly set up
- You have added both buildpacks mentioned above
- The "start" script in package.json is set to "node server.cjs"
- Your server.cjs file is correctly configured to serve static files from the dist directory

For more help, check Heroku's documentation or run:
```
heroku logs --tail
```
