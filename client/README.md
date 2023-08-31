# API Information

This API also uses the `Link` HTTP header to give you back the urls to the `next`, `previous`, `first`, and `last` pages. In our case we really only need the `next` page url. In order to parse this header you can use the `parseLinkHeader` function in the `client` folder.

The API has the following endpoints:

- `GET /photos?_page=<page>&_limit=<limit>` - Returns up to `<limit>` photos starting at `<page>` page.
- `GET /photos-short-list?_page=<page>&_limit=<limit>` - This is identical to the above endpoint but this endpoint only has 100 photos total so you can more easily test what happens when you reach the end of the list.
