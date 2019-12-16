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
