# Search Engine - Medtryck Assignment

## High Level Architecture
![search-engine drawio](https://user-images.githubusercontent.com/54449489/207687071-4a762174-7a45-4f92-8606-c834a296a873.png)

As shown in the diagram above, we have 3 components that work together to provide the complete service,
- **React Server.** It is hosted on `localhost:3000`. It serves the UI and communicates with the rails backend to search the locations
- **Rails Backend.** It is rails web server that is responsible for the following operations while running on `localhost:8080`
  - Handles the location searching request coming from the react frontend.
  - Communicates with the elastic search server. It creates, updates and deletes the indexes on elastic search server.
- **Elastic Search Server.** This service holds the inverted index to perform full-text search on Locations. It run on `localhost:9200`.
  - It keeps an inverted index on `Location.title`.
  - It does "term-level query" and uses `BM25` similarity algorthim to rank the retrieved results. `BM25` uses `TF/IDF` algo underneath and is suited for smaller fields like `Location.title`. More about it on https://www.elastic.co/guide/en/elasticsearch/reference/7.17/index-modules-similarity.html#bm25

## Developed in Environment
- Node v19.2.0
- Rails 7.0.4
- Ruby 3.1.0
- Elastic Search v7.17.4 (install by running `brew install elastic/tap/elasticsearch-full`)

## How to Run
1. Boot rails server at port `8080` by running `bin/rails s -p 8080` inside the `/backend` directory with proper mysql db config inside `database.yml` file
2. Boot rails server at port `3000` by running `yarn start` inside the `/frontend` directory
3. Run elastic search by running command `elasticsearch`
4. Create index on locations by running the rake task `bin/rake search_index:create_search_index` inside `/backend` directory
5. Seed locations by running the rake task `bin/rake seed:seed_locations_from_json_file` inside `/backend` directory
6. Go to `localhost:3000` in the browser and start searching locations

Test Run:

https://user-images.githubusercontent.com/54449489/207801326-b64c9f07-36b9-4458-8eb0-fe75c67010b2.mov

## Code Structure
### Rails App
- Models
  - Location
  - Concerns
    - Searchable (makes any Model in which it is imported searchable on Elastic Search)
- Controllers
  - Location
- Services
  - Elastic Search Results Parser - for parsing the results returned by elastic search query
  - Service Utils - contains all utility methods that are not part of views, controller, and models.
- Rake Tasks
  - `search_index:create_search_index` to create inverted index on location on elastic search
  - `seed:seed_locations_from_json_file` for loading location from `locations.json` file
- Initializers
  - `cors.rb` to handle CORS config (for ease - we have currently enabled requests from every origin)

### React App
- App uses `tailwind` for styling, `Formik` for forms and `yup` for form validation.
- The app has a main page rendered by the component `LocationSearchPage`
- `LocationSearchPage` uses `SearchForm` and `SearchResults` components to render the search form and search results respectively.
