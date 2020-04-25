# Open Pension CMS
This is the CMS part for Open Pension.

## Set up
Run `docker-compose up -d`
After docker-compose finished booting up you can start using the service by going to
`http://localhost/backoffice`

## Query example
```
query {
  instrumentQuery {
    entities {
      ... on Instrument {
        instrumentName
      }
    }
  }
}
```

