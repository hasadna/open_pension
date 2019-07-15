# Open Pension CMS
This is the CMS part for Open Pension.

## Set up
For now, the installation script does not work well when it's part of the 
`Dockerfile`. After you run the `docker-compose up -d` you'll need to ssh into 
the container and install:

```bash
docker-compose exec cms bash
bash script/set-up.sh
```

After you install everything you can start using the service by going to 
`http://localhost:8080/drupal/web/`

