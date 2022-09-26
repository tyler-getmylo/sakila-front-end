# Sakila Front-end

This repo will serve as the front-end for the admin interface to the sakila movie rental database.

The plan is to rewrite all of this code. A REST API will be built using Nest js to access the database and utilize the
balderdashy/waterline ORM.

## Implementation so far:

- One of the main features implemented is using fuzzy search to find movies based on title and description.
- Once a list of movies has been filtered you can click the icon on the left side of the table to take you to a details
  page.

## Usage

- Install MySQL locally and create a user.
- Follow the directions [here](https://dev.mysql.com/doc/sakila/en/) to load the "sakila" schema and data.
- Add `MYSQL_PASS=<password>` to your environment variables.
- run `yarn dev` from the repo root.

### Issues

I'm getting the following error one time when running `yarn dev`. My guess is that the _app.js file is attempting to be
rendered on the server but no page to wrap has been specified so the PropTypes validation fails. This is not an issue
for subsequent page loads it's only on server startup.

```
Warning: Failed prop type: Invalid prop `Component` supplied to `App`, expected a ReactNode.
    at App (webpack-internal:///./pages/_app.jsx:17:16)
    at StyleRegistry (/Users/tyler/mylo/projects/sakila-front-end/node_modules/styled-jsx/dist/index/index.js:448:36)
    at AppContainer (/Users/tyler/mylo/projects/sakila-front-end/node_modules/next/dist/server/render.js:298:29)
    at AppContainerWithIsomorphicFiberStructure (/Users/tyler/mylo/projects/sakila-front-end/node_modules/next/dist/server/render.js:327:57)
    at div
    at Body (/Users/tyler/mylo/projects/sakila-front-end/node_modules/next/dist/server/render.js:614:21)
Warning: Failed prop type: Invalid prop `pageProps` of type `object` supplied to `App`, expected `array`.
    at App (webpack-internal:///./pages/_app.jsx:17:16)
    at StyleRegistry (/Users/tyler/mylo/projects/sakila-front-end/node_modules/styled-jsx/dist/index/index.js:448:36)
    at AppContainer (/Users/tyler/mylo/projects/sakila-front-end/node_modules/next/dist/server/render.js:298:29)
    at AppContainerWithIsomorphicFiberStructure (/Users/tyler/mylo/projects/sakila-front-end/node_modules/next/dist/server/render.js:327:57)
    at div
    at Body (/Users/tyler/mylo/projects/sakila-front-end/node_modules/next/dist/server/render.js:614:21)
```