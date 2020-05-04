# Open pension fetcher


## Setting up
If you want with Docker you can do, using docker compose:
```bash
docker-compose up -d fetcher
```
In other case you can just do:
```bash
npm i
npm run dev # Will set up the local server with live reloading.
```

## Querying
After you got it work you can go to `localhost:3000/grpahql` or `localhost:5000/grpahql`.
Here's a full example of an example for query:
```
query {
	systemField {
    Id, Label
  }
  reportsType {
    Id, Label
  },
  toYearRange {
    Years,
    Quarters {
      Id,
      Label
    }
  } 
}
```

## Get the reports
In order to get the reports you can do a mutation request which will eventually download the files and store them in 
out storage (Google cloud storage). Here's an example:
```
mutation {
  downloadReports(
    query: {
      SystemField: "520042631",
      ReportType: "71100075",
      Company: "510927536",
    	FromYearPeriod: {Year: 2012, Quarter: "1"},
      ToYearPeriod: {Year: 2020, Quarter: "1"}
  	}
  ) {
    links
  }
}
``` 

## Env file
The env file should have the next values:

    * foo - bar 
