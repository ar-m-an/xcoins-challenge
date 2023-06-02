# Running Project

```shell
cp .env.example .env
docker compose up -d --build
```

# Modifications

- Removed unused dependencies

- Resolved version mismatch between `typescript` and `ts-node-dev`

- Configured eslint and prettier

- Added API tests before refactoring

- Improved models' schema definitions by adding interfaces, changing strings to Object refs and making favorites 
into an array

- Moved logic from routers to controllers

- Removed `console.log`s in routers and added `morgan` http logger

- Added validation using `joi` library

- Removed other `console.log`s and replaced them with `winston` logger

- Refactored database connection logic to reuse code in app, tests, and the seed script

- Added example `.env` file

- Resolved version mismatches between `typescript`, `winston`, `ts-node` and `joi` happening during production build

- Dockerized project


# Notes

I preserved the API specifications, however following changes can be also made:

- normalizing database by creating a Crypto model for `preffered_cryptocurrnecy` and `crypto_currency` fields

- using query params for filtering profiles with get request instead of sending them in post body

- using plural nouns for api endpoints
