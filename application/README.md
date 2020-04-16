# Application

The application service holds the clean, filtered and ordered data.

## Setting up
You'll need go from version `1.13` and above and a MySQL version `5.7.xx`.

## Local development
Open the file `.env` and set the credentials to what you need in the `MYSQL_XX` variables and just `go run server.go`.

For seeding dummy data just run `go run sandbox.go`, after one minute you'll see: `{Passed }` which means that all the 
dummy data is loaded.

## Using docker
For now, development mode with docker is not ready yet but you can fire up the container.

## Querying
Head to postman and fire the query against `localhost:3000`:
```REST
query {
    instruments {
        id
        instrument_name
        instrument_number
    }
}
```
