# Catstore Server

The server for the catstore application.

## Instructions

- `npm ci` to install the locked dependencies
- `npm run start` to run the server
- The API will be running on port `3002` at http://localhost:3002
- That's it

## Technical notes

- SQL statements use parameter placeholders instead of interpolating request data into query strings.
- Request bodies and route parameters are validated before database calls are made.
- This is still a teaching server, not production auth. Passwords remain plain text in the sample database so the book can keep the login flow simple.
