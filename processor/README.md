# Processor

The processor responsible for converting a rough xsl file to an object which later on will be handle by other services.

## Setting up

You can do
```bash
docker-compose up -d processor
```
and go to `http://localhsot:processor`.

### Local development
Just do `npm -i` and start to fire up.

## Endpoint

### Service status

```restful
GET /
```

If the service is alive you'll get:
```json
{"status": "alive"}
```

if not, please check.

### Send files to process

```REST
POST /upload

{
    "files": [files_to_process]
}
```

The service will get the files, save them and return an object like this:
```json
{
  "filename": "filename", 
  "status": "new",
  "id": "and ID for later process"
}
```

### Processing a file
```REST
PATCH /process/:object_id
```

Will return

```json
{
  "filename": "filename", 
  "status": "new",
  "id": "and ID for later process",
  "results": {"results": "of the processing"}
}
```


### Get the results

```restful
GET /results/:object_id
```

Will return

```json
{
  "filename": "filename", 
  "status": "new",
  "id": "and ID for later process",
  "results": {"results": "of the processing"}
}
```
