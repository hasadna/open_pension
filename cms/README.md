# Open Pension CMS
This is the CMS part for Open Pension.

## Set up
Run `docker-compose up cms -d`

Next ssh into the container:
```bash
docker-compose exec cms bash
```

After the ssh connection you'll need to run the next code:
```bash
bash web/profiles/post_setup.sh
```
This will set up last touches and import reclamation tables and some dummy
content.

## Working with the CMS
Now, that you got the cms you go to http://localhost:2000/. The credentials are
admin/admin.


## Query example

The grpahql explorer is available at http://localhost:2000/graphql/explorer.

The query works by the next logic:
```
query {
  {entityType}Query {
    entities {
      ... on Node{Bundle} {
        title
      }
    }
  }
}

```

### Blogs query
Blog, in our example is a bundle of node so this is an example on getting the
list of blogs.

```
query {
  nodeQuery {
    entities {
      ... on NodeBlog {
        title
      }
    }
  }
}
```

### Reclamation data
Reclamation can be accessed via
http://localhost:2000/admin/open_pension/reclamations/instrument-type so if we want to get the
list instruments we'll need to do something like this:

```
query {
  instrumentTypeQuery {
    entities {
      ... on InstrumentType {
        instrumentType
        code
      }
    }
  }
}
```

