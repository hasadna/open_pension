# Fetcher for Open Pension project
- WORK IN PROGRESS
- Should download files from the CMA API that is used here - https://employersinfocmp.cma.gov.il/#/publicreports

- Currently uses the S3 Bucket defined in .env - !!! Public bucket !!!
  - The bucket is IP limited so it won't work

- Exposes a Graphql endpoint (http://localhost:3000/graphql)
- Usage graphql query example - 
```
mutation DownloadReports {
  downloadReports(query: {fromQuarter: 1, toQuarter: 2, fromYear: 2019, toYear: 2019, statusReport: 1}) {
    links
  }
}
```
