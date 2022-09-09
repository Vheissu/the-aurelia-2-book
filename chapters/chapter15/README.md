# catstore

This project is bootstrapped by [aurelia/new](https://github.com/aurelia/new).

## Start dev web server

    npm start

## Build the app in production mode

    npm run build

It builds all files to dist folder. To deploy to production server, copy all the `dist/*` files to production root folder.

For example
```
dist/index.html
dist/foo.12345.js
```
Copy to production root folder
```
root_folder/index.html
root_folder/foo.12345.js
```

## Unit Tests

    npm run test

Run unit tests in watch mode.

    npm run test:watch


## Analyze webpack bundle

    npm run analyze

## Playwright e2e test

You may need to install playwright test browsers if have not.

   npx playwright install --with-deps

All e2e tests are in `e2e/`.

Run e2e tests with:

    npm run test:e2e

Note the playwright config automatically runs "npm start" before playwright.

For more information, visit https://playwright.dev/docs/test-cli
