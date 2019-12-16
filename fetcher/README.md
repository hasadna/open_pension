# Fetcher for Open Pension project
- WORK IN PROGRESS
- Should download files from the CMA API that is used here - https://employersinfocmp.cma.gov.il/#/publicreports

- Currently uses the Google Storage Bucket defined in .env - !!! Public bucket !!!
- Only uses the bucket if ENV=prod or staging

- Exposes a Graphql endpoint (http://localhost:3000/graphql)
- Usage graphql query example -
```
mutation DownloadReports {
  downloadReports(query: {fromQuarter: 1, toQuarter: 2, fromYear: 2019, toYear: 2019, statusReport: 1}) {
    links
  }
}
```

## Development
- Running local Kafka docker
```
docker run --rm -p 2181:2181 -p 3030:3030 -p 8081-8083:8081-8083 \
  -p 9581-9585:9581-9585 -p 9092:9092 -e ADV_HOST=localhost \
  landoop/fast-data-dev:latest
```
