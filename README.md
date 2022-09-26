# Sakila Front-end

This repo will serve as the front-end for the admin interface to the sakila movie rental database.

The plan is to rewrite all of this code.  A REST API will be built using Nest js to access the database and utilize the
balderdashy/waterline ORM.

## Implementation so far:

- One of the main features implemented is using fuzzy search to find movies based on title and description.
- Once a list of movies has been filtered you can click the icon on the left side of the table to take you to a details
  page.